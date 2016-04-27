"use strict";

(function (require) {

    var _ = require('underscore');
    var Q = require('q');
    var Promise = Q['promise'];

    var ControllerUtils = require('./../utils/controllerUtils');

    var UserRepository = require('./../db/dataAccessLayers/userRepository');
    var RequestFilter = require('./../requestFilter');

    module.exports = function (apiController) {
        return apiController({
            routePrefix: 'api/users',
            actions: [
                {
                    route: ':userId',
                    method: 'get',
                    params: ['userId'],
                    ridParams: ['userId'],
                    filters: [
                        RequestFilter.checkAuthorization(),
                        RequestFilter.checkOwnerAccess('userId')
                    ],
                    handler: function (userId) {

                        return Promise(function (resolve, reject) {

                            UserRepository.getUserById(userId)
                                .then(function (user) {
                                    resolve(user);
                                }, function (e) {
                                    reject(e);
                                });
                        });
                    }
                },
                {
                    route: ':userId/name',
                    method: 'get',
                    params: ['userId'],
                    ridParams: ['userId'],
                    filters: [
                        RequestFilter.checkAuthorization()
                    ],
                    handler: function (userId) {

                        return Promise(function (resolve, reject) {

                            UserRepository.getUserName(userId)
                                .then(function (name) {
                                    resolve({
                                        name: name
                                    });
                                }, function (e) {
                                    reject(e);
                                });
                        });
                    }
                },
                {
                    route: '~/api/users/isUserExists',
                    method: 'post',
                    params: [(function genericId() {
                        return new ControllerUtils.RequestResolver('body.genericId');
                    })()],
                    handler: function (genericId) {

                        return Promise(function (resolve, reject) {

                            UserRepository.isUserExists(genericId)
                                .then(function (isUserExists) {
                                    resolve({
                                        isUserExists: isUserExists
                                    });
                                })
                                .catch(function (e) {
                                    reject(e);
                                });
                        });
                    }
                }
            ]
        });
    };

})(require);