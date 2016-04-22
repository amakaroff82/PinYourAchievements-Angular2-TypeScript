(function (require, module) {

    var _ = require("underscore");
    var q = require("q");
    var promise = q["promise"];

    var requestError = require("./requestError");
    var controllerUtils = require("./utils/controllerUtils");
    var modelValidatorEngine = require("./modelValidatorEngine");

    function asPromise(func) {
        return q.when(func());
    }

    function applyRequestFilters(request, filters) {

        if (filters.length > 0) {

            var filterIndex = 0;

            return promise(function (resolve, reject) {

                var applyNextRequestFilter = function () {
                    if (filterIndex == filters.length) {
                        resolve();
                    } else {
                        asPromise(function () {
                            return filters[filterIndex++].invoke(request);
                        }).then(function () {
                            applyNextRequestFilter();
                        }, function (e) {
                            reject(e);
                        });
                    }
                };

                applyNextRequestFilter();
            });
        } else {
            return q.when();
        }
    }

    function sendSuccess(response, data) {

        process.nextTick(function () {

            response.status(200);
            response.json(data);
        });
    }

    function sendError(response, error) {

        error = error || requestError.internalServerError();

        if (!(error instanceof requestError)) {

            if (error instanceof Error) {

                console.error(error.stack);

                error = requestError.internalServerError(error);
            } else {
                error = requestError.internalServerError(error || "");
            }
        }

        process.nextTick(function () {

            response.status(error.httpCode);
            response.json({
                code: error.code,
                message: error.message,
                data: error.data
            });
        });
    }

    function normalizeRoute(route) {

        if (/^\/.*$/.test(route)) {

            return route.replace(/^\/(.*)$/, function (text, route) {

                return route;
            });
        }

        return route;
    }

    module.exports = function (app) {

        return function (options) {

            var routePrefix = normalizeRoute(options.routePrefix || "");
            var actions = options.actions || [];

            _.forEach(actions, function (action) {

                var locals = action.locals || {};
                var params = action.params || [];
                var paramsTransform = action.paramsTransform || {};

                var getActionArguments = (function () {

                    if (params.length > 0) {

                        var resolvers = [];

                        _.forEach(params, function (param) {

                            switch (true) {
                                case (typeof param == "string"):
                                {
                                    var paramName = param;

                                    resolvers.push(function (request) {
                                        return request.params[paramName];
                                    });

                                    break;
                                }
                                case (param instanceof controllerUtils.RequestResolver):
                                {
                                    var requestResolver = param;

                                    resolvers.push(function (request) {
                                        return requestResolver.resolve(request);
                                    });

                                    break;
                                }
                                case (param instanceof controllerUtils.ResponseResolver):
                                {
                                    var responseResolver = param;

                                    resolvers.push(function (request, response) {
                                        return responseResolver.resolve(response);
                                    });

                                    break;
                                }
                                default :
                                {
                                    throw new Error("Invalid param: " + param);
                                }
                            }
                        });

                        return function (request, response) {

                            var actionArguments = [];

                            _.forEach(resolvers, function (resolve) {
                                var value = resolve(request, response);
                                actionArguments.push(value);
                            });

                            return actionArguments;
                        }
                    }

                    return function () {
                        return [];
                    };
                })();

                var method = (action.method || "get").toLowerCase();
                var modelValidator = (function () {

                    if (method == "post" || method == "put") {

                        var validationStrategy = action.validationStrategy;
                        if (validationStrategy) {

                            if (validationStrategy instanceof modelValidatorEngine.ValidationStrategy) {
                                return {
                                    validate: function (model) {
                                        return new modelValidatorEngine(model, validationStrategy).validate();
                                    }
                                };
                            }

                            throw new TypeError("Invalid validation strategy");
                        }
                    }
                })();
                var filters = action.filters || [];
                var handler = action.handler;
                var route = (function (route) {

                    if (route) {

                        if (/^\~.*$/.test(route)) {
                            return route.replace(/^\~(.*)$/, function (text, route) {
                                return route;
                            });
                        }

                        if (routePrefix) {
                            return "/" + routePrefix + "/" + route;
                        }

                        return "/" + route;
                    }

                    return "/" + routePrefix;

                })(normalizeRoute(action.route || ""));

                app[method](route, (function () {

                    function invokeHandler(request, response, next) {

                        if (modelValidator) {

                            var model = request.body || {};
                            var errors = modelValidator.validate(model);

                            if (errors) {

                                sendError(response, requestError.badRequest({
                                    code: "INVALID_MODEL",
                                    data: errors
                                }));

                                return;
                            }
                        }

                        asPromise(function () {

                            return handler.apply({
                                request: request,
                                response: response,
                                next: next
                            }, getActionArguments(request, response));

                        }).then(function (data) {
                            sendSuccess(response, data);
                        }, function (e) {
                            sendError(response, e);
                        });
                    }

                    return function (request, response, next) {

                        (function () {

                            return promise(function (resolve, reject) {

                                if (_.size(locals) > 0) {

                                    var promises = [];
                                    var keys = _.keys(locals);

                                    _.forEach(locals, function (value) {
                                        promises.push(asPromise(function () {

                                            if (typeof value === "function") {
                                                return value();
                                            }

                                            return value;
                                        }));
                                    });

                                    promise.all(promises)
                                        .then(function (result) {

                                            var locals = {};

                                            _.forEach(result, function (value, index) {
                                                locals[keys[index]] = value;
                                            });

                                            request.locals = locals;

                                            resolve();
                                        }, reject);
                                } else {
                                    resolve();
                                }
                            });
                        })().then(function () {

                            _.forEach(paramsTransform, function (transformFn, paramName) {
                                if (request.params[paramName]) {
                                    request.params[paramName] = transformFn(request.params[paramName]);
                                }
                            });

                            applyRequestFilters(request, filters)
                                .then(function () {
                                    invokeHandler(request, response, next);
                                }, function (e) {
                                    sendError(response, e);
                                });

                        }, function (e) {
                            sendError(response, e);
                        });
                    };
                })());
            });
        };
    };

})(require, module);