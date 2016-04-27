"use strict";

(function (require) {

    var _ = require('underscore');
    var Promise = require('q')['promise'];
    var DbProvider = require('../dbProvider').usePath('sql/authSessions/');
    var SecurityUtils = require('./../../utils/securityUtils');

    function createAuthSession(userId) {

        return Promise(function (resolve, reject) {

            removeAuthSessionByUserId(userId)
                .then(function () {

                    var token = SecurityUtils.generateToken();
                    var expirationDate = _.now() + (1000 * 60 * 60);

                    DbProvider.executeQuery('createAuthSession.sql', {
                        userId: userId,
                        token: token,
                        expirationDate: expirationDate
                    }).then(function () {
                        resolve({
                            userId: userId,
                            token: token,
                            expirationDate: expirationDate
                        });
                    }).catch(function (e) {
                        reject(e);
                    });
                })
                .catch(function (e) {
                    reject(e);
                });
        });
    }

    function findAuthSessionByToken(token) {
        return Promise(function (resolve, reject) {
            DbProvider.executeQuery('findAuthSessionByToken.sql', {
                token: token
            }).then(function (result) {
                if (result.length > 0) {
                    var authSession = result[0];
                    resolve({
                        userId: authSession.userId,
                        token: authSession.token,
                        expirationDate: authSession.expirationDate
                    });
                } else {
                    resolve();
                }
            }).catch(function (e) {
                reject(e);
            });
        });
    }

    function findAuthSessionByUserId(userId) {
        return Promise(function (resolve, reject) {
            DbProvider.executeQuery('findAuthSessionByUserId.sql', {
                userId: userId
            }).then(function (result) {
                if (result.length > 0) {
                    var authSession = result[0];
                    resolve({
                        userId: authSession.userId,
                        token: authSession.token,
                        expirationDate: authSession.expirationDate
                    });
                } else {
                    resolve();
                }
            }).catch(function (e) {
                reject(e);
            });
        });
    }

    function removeAuthSessionByToken(token) {
        return Promise(function (resolve, reject) {
            DbProvider.executeQuery('removeAuthSessionByToken.sql', {
                token: token
            }).then(function (result) {
                if (result > 0) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            }).catch(function (e) {
                reject(e);
            });
        });
    }

    function removeAuthSessionByUserId(userId) {
        return Promise(function (resolve, reject) {
            DbProvider.executeQuery('removeAuthSessionByUserId.sql', {
                userId: userId
            }).then(function (result) {
                if (result > 0) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            }).catch(function (e) {
                reject(e);
            });
        });
    }

    module.exports = {
        createAuthSession: createAuthSession,
        findAuthSessionByToken: findAuthSessionByToken,
        findAuthSessionByUserId: findAuthSessionByUserId,
        removeAuthSessionByToken: removeAuthSessionByToken,
        removeAuthSessionByUserId: removeAuthSessionByUserId
    }

})(require);