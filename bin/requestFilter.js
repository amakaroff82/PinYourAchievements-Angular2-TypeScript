"use strict";

(function (require) {

    var _ = require("underscore");
    var q = require("q");
    var promise = q["promise"];

    var authSessionProvider = require("./providers/authSessionProvider");
    var requestUtils = require("./utils/requestUtils");
    var requestError = require("./requestError");

    function RequestFilter(action) {
        this.action = action;
    }

    RequestFilter.prototype = {
        constructor: RequestFilter,
        invoke: function (request) {
            return this.action(request);
        }
    };

    function getAuthSession(request) {
        return requestUtils.getAuthSession(request, function () {
            return requestError.badRequest({
                code: "AUTHENTICATION.BAD_TOKEN"
            });
        }, function () {
            return requestError.unauthorized({
                code: "AUTHENTICATION.INVALID_TOKEN"
            });
        });
    }

    RequestFilter.checkAuthorization = function () {
        return new RequestFilter(function (request) {

            return promise(function (resolve, reject) {

                getAuthSession(request).then(function (authSession) {

                    if (_.now() >= authSession.expirationDate) {

                        authSessionProvider.removeAuthSessionByToken(authSession.token)
                            .then(function () {
                                reject(requestError.unauthorized({
                                    code: "AUTHENTICATION.TOKEN_EXPIRED"
                                }));
                            }, function (e) {
                                reject(e);
                            });
                    } else {

                        resolve();
                    }
                }, function (e) {
                    reject(e);
                });
            });
        });
    };

    RequestFilter.checkOwnerAccess = function (paramName) {
        return new RequestFilter(function (request) {

                var userId = request.params[paramName];

                return promise(function (resolve, reject) {

                    getAuthSession(request).then(function (authSession) {

                        if (authSession.userId == userId) {
                            resolve();
                        } else {
                            reject(requestError.forbidden());
                        }
                    }, function () {
                        reject(requestError.internalServerError());
                    });
                });
            }
        );
    };

    module.exports = RequestFilter;

})(require);