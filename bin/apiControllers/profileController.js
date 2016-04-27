"use strict";

(function (require) {

    var Q = require('q');
    var Promise = Q['promise'];

    var ProfileRepository = require('./../db/dataAccessLayers/profileRepository');
    var RequestFilter = require('./../requestFilter');
    var RequestError = require('./../requestError');
    var SecurityUtils = require('./../utils/securityUtils');

    module.exports = function (apiController) {
        return apiController({
            routePrefix: 'api/users/:userId/profile',
            actions: [
                {
                    route: '',
                    method: 'get',
                    params: ['userId'],
                    ridParams: ['userId'],
                    filters: [
                        RequestFilter.checkAuthorization(),
                        RequestFilter.checkOwnerAccess('userId')
                    ],
                    handler: function (userId) {

                        return Promise(function (resolve, reject) {

                            ProfileRepository.getProfile(userId)
                                .then(function (profile) {
                                    if (profile) {
                                        resolve(profile);
                                    } else {
                                        reject(RequestError.badRequest({
                                            code: 'COMMON.USER_NOT_FOUND'
                                        }));
                                    }
                                })
                                .catch(function (e) {
                                    reject(e);
                                });
                        });
                    }
                },
                {
                    route: 'update',
                    method: 'post',
                    params: ['userId', this.model()],
                    ridParams: ['userId'],
                    filters: [
                        RequestFilter.checkAuthorization(),
                        RequestFilter.checkOwnerAccess('userId')
                    ],
                    handler: function (userId, model) {

                        return Promise(function (resolve, reject) {

                            ProfileRepository.updateProfile(userId, model)
                                .then(function (status) {
                                    if (status) {
                                        resolve();
                                    } else {
                                        reject(RequestError.badRequest({
                                            code: 'COMMON.USER_NOT_FOUND'
                                        }));
                                    }
                                })
                                .catch(function (e) {
                                    reject(e);
                                });
                        });
                    }
                },
                {
                    route: 'password/change',
                    method: 'post',
                    params: ['userId', this.model()],
                    ridParams: ['userId'],
                    filters: [
                        RequestFilter.checkAuthorization(),
                        RequestFilter.checkOwnerAccess('userId')
                    ],
                    handler: function (userId, model) {

                        return Promise(function (resolve, reject) {

                            ProfileRepository.changePassword(userId, model, function (password, passwordHash) {

                                if (SecurityUtils.validateHash(password, passwordHash)) {
                                    return;
                                }

                                throw RequestError.badRequest({
                                    code: 'AUTHORIZATION.INVALID_PASSWORD'
                                });

                            }, function (password) {
                                return SecurityUtils.generateHash(password);
                            }).then(function (status) {

                                if (status) {
                                    resolve();
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
                }
            ]
        });
    };

})(require);