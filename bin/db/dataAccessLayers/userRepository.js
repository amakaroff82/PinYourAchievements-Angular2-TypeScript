"use strict";

(function (require) {

    var _ = require('underscore');
    var Promise = require('q')['promise'];
    var DbProvider = require('../dbProvider').usePath('sql/users/');
    var DbHelper = require('./../../utils/db/dbHelper');

    function createUser(model, generatePasswordHash, onUserExists) {

        return Promise(function (resolve, reject) {

            getUserByGenericId(model.genericId)
                .then(function (user) {

                    if (user) {

                        try {
                            onUserExists(user);
                        } catch (e) {
                            reject(e);
                        }
                    } else {

                        DbProvider.executeQuery('createUser.sql', {
                            genericId: model.genericId,
                            registeredDate: _.now(),
                            profile: {
                                name: model.name,
                                passwordHash: generatePasswordHash(model.password),
                                email: model.email
                            },
                            authorizationProvider: model.authorizationProvider
                        }).then(function (results) {

                            var user = results[0];
                            var userId = DbHelper.getRecordId(user);

                            resolve(userId);

                        }, function (e) {
                            reject(e);
                        });
                    }
                }, function (e) {
                    reject(e);
                });
        });
    }

    function findUser(model, verifyPasswordHash) {

        return Promise(function (resolve, reject) {

            DbProvider.executeQuery('getUserByGenericId.sql', {
                genericId: model.genericId
            }).then(function (result) {

                if (result.length > 0) {

                    var user = result[0];
                    var profile = user.profile;

                    try {

                        if (verifyPasswordHash) {
                            verifyPasswordHash(model.password, profile.passwordHash);
                        }

                        resolve({
                            id: DbHelper.getRecordId(user),
                            profile: {
                                name: profile.name,
                                email: profile.email
                            }
                        });

                    } catch (e) {
                        reject(e);
                    }

                } else {
                    resolve();
                }
            }).catch(function (e) {
                reject(e);
            });
        });
    }

    function getUserByGenericId(genericId) {

        return Promise(function (resolve, reject) {

            DbProvider.executeQuery('getUserByGenericId.sql', {
                genericId: genericId
            }).then(function (result) {

                if (result.length > 0) {

                    var user = result[0];
                    var profile = user.profile;

                    resolve({
                        id: DbHelper.getRecordId(user),
                        registeredDate: user.registeredDate,
                        profile: {
                            name: profile.name,
                            email: profile.email
                        }
                    });
                } else {

                    resolve();
                }
            }).catch(function (e) {

                reject(e);
            });
        });
    }

    function getUserById(userId) {

        return Promise(function (resolve, reject) {

            DbProvider.executeQuery('getUserById.sql', {
                userId: userId
            }).then(function (result) {

                if (result.length > 0) {

                    var user = result[0];
                    var profile = user.profile;

                    resolve({
                        id: DbHelper.getRecordId(user),
                        registeredDate: user.registeredDate,
                        profile: {
                            name: profile.name,
                            email: profile.email
                        }
                    });
                } else {

                    resolve();
                }
            }).catch(function (e) {

                reject(e);
            });
        });
    }

    function getUserName(userId) {

        return Promise(function (resolve, reject) {

            DbProvider.executeQuery('getUserName.sql', {
                userId: userId
            }).then(function (result) {

                if (result.length > 0) {

                    var user = result[0];

                    resolve(user.name);
                } else {

                    resolve();
                }
            }).catch(function (e) {

                reject(e);
            });
        });
    }

    function isUserExists(genericId) {

        return Promise(function (resolve, reject) {

            DbProvider.executeQuery('isUserExists.sql', {
                genericId: genericId
            }).then(function (results) {
                var isUserExists = results[0].count > 0;
                resolve(isUserExists);
            }).catch(function (e) {
                reject(e);
            });
        });
    }

    module.exports = {
        createUser: createUser,
        findUser: findUser,
        getUserByGenericId: getUserByGenericId,
        getUserById: getUserById,
        getUserName: getUserName,
        isUserExists: isUserExists
    };

})(require);