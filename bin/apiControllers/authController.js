"use strict";

(function (require) {

    var _ = require('underscore');
    var Q = require('q');
    var Promise = Q['promise'];

    var UserRepository = require('./../db/dataAccessLayers/userRepository');
    var AuthSessionRepository = require('../db/dataAccessLayers/authSessionRepository');

    var RequestError = require('./../requestError');
    var SecurityUtils = require('./../utils/securityUtils');
    var ControllerUtils = require('./../utils/controllerUtils');
    var RequestUtils = require('./../utils/requestUtils');
    var AuthSessionProvider = require('../providers/authSessionProvider');
    var RequestFilter = require('./../requestFilter');

    function request() {
        return new ControllerUtils.RequestResolver();
    }

    function response() {
        return new ControllerUtils.ResponseResolver();
    }

    function login(userId) {

        return Promise(function (resolve, reject) {

            AuthSessionRepository.createAuthSession(userId)
                .then(function (authSession) {
                    resolve(authSession);
                })
                .catch(function (e) {
                    reject(e);
                });
        });
    }

    module.exports = function (apiController) {
        return apiController({
            routePrefix: 'api/auth',
            actions: [
                {
                    route: 'signIn',
                    method: 'post',
                    params: [this.model(), request(), response()],
                    handler: function (model, request, response) {

                        return Promise(function (resolve, reject) {

                            UserRepository.findUser({
                                genericId: model.email,
                                password: model.password
                            }, function (password, passwordHash) {

                                if (SecurityUtils.validateHash(password, passwordHash)) {
                                    return;
                                }

                                throw RequestError.badRequest({
                                    code: 'AUTHORIZATION.INVALID_PASSWORD'
                                });

                            }).then(function (user) {

                                if (user) {
                                    login(user.id)
                                        .then(function (authSession) {

                                            response.cookie("x-access-token", authSession.token, {
                                                expires: new Date(authSession.expirationDate),
                                                httpOnly: true
                                            });

                                            resolve({
                                                userId: authSession.userId
                                            });
                                        })
                                        .catch(function (e) {
                                            reject(e);
                                        });
                                } else {
                                    reject(RequestError.badRequest({
                                        code: 'COMMON.USER_NOT_FOUND'
                                    }));
                                }

                            }).catch(function (e) {
                                reject(e);
                            });
                        });
                    }
                },
                {
                    route: 'signUp',
                    method: 'post',
                    params: [this.model(), request(), response()],
                    handler: function (model, request, response) {

                        return Promise(function (resolve, reject) {

                            UserRepository.createUser({
                                genericId: model.email,
                                name: model.name,
                                password: model.password,
                                email: model.email
                            }, function (password) {
                                return SecurityUtils.generateHash(password);
                            }, function () {
                                throw RequestError.badRequest({
                                    code: 'AUTHORIZATION.USER_ALREADY_EXISTS'
                                });
                            }).then(function (userId) {

                                login(userId)
                                    .then(function (authSession) {

                                        response.cookie("x-access-token", authSession.token, {
                                            expires: new Date(authSession.expirationDate),
                                            httpOnly: true
                                        });

                                        resolve({
                                            userId: authSession.userId
                                        });
                                    })
                                    .catch(function (e) {
                                        reject(e);
                                    });

                            }).catch(function (e) {
                                reject(e);
                            });
                        });
                    }
                },
                {
                    route: 'logout',
                    params: [request(), response()],
                    filters: [
                        RequestFilter.checkAuthorization()
                    ],
                    handler: function (request, response) {

                        var token = RequestUtils.getToken(request);
                        if (token) {

                            return Promise(function (resolve, reject) {

                                AuthSessionProvider.removeAuthSessionByToken(token)
                                    .then(function () {
                                        response.clearCookie("x-access-token");
                                        resolve();
                                    }, function (e) {
                                        reject(e);
                                    });
                            });
                        } else {
                            throw RequestError.badRequest({
                                code: 'AUTHENTICATION.BAD_TOKEN'
                            });
                        }
                    }
                }
            ]
        });
    };

})(require);