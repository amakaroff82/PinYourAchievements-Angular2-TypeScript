"use strict";

(function (require) {

    var _ = require('underscore');
    var Promise = require('q')['promise'];
    var DbProvider = require('../dbProvider').usePath('sql/profiles/');

    function getProfile(userId) {

        return Promise(function (resolve, reject) {

            DbProvider.executeQuery('get-profile.sql', {
                userId: userId
            }).then(function (result) {

                if (result.length > 0) {

                    var profile = result[0];

                    resolve({
                        name: profile.name,
                        email: profile.email
                    });
                } else {

                    resolve();
                }
            }).catch(function (e) {

                reject(e);
            });
        });
    }

    function updateProfile(userId, model) {

        return Promise(function (resolve, reject) {

            DbProvider.executeQuery('update-profile.sql', {
                userId: userId,
                name: model.name
            }).then(function (result) {
                if (result[0].value > 0) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            }).catch(function (e) {
                reject(e);
            });
        });
    }

    function changePassword(userId, model, verifyPasswordHash, generatePasswordHash) {

        return Promise(function (resolve, reject) {

            DbProvider.executeQuery('get-password-hash.sql', {
                userId: userId
            }).then(function (result) {

                if (result.length > 0) {

                    var passwordHash = result[0].passwordHash;

                    var oldPassword = model.oldPassword;
                    var newPassword = model.newPassword;

                    try {

                        verifyPasswordHash(oldPassword, passwordHash);

                        DbProvider.executeQuery('change-password-hash.sql', {
                            userId: userId,
                            passwordHash: generatePasswordHash(newPassword)
                        }).then(function () {
                            resolve(true);
                        }).catch(function (e) {
                            reject(e);
                        });

                    } catch (e) {
                        reject(e);
                    }
                } else {
                    resolve(false);
                }
            }).catch(function (e) {
                reject(e);
            });
        });
    }

    function verifyEmail(userId) {

        return Promise(function (resolve, reject) {

            DbProvider.executeQuery('verifyEmail.sql', {
                userId: userId
            }).then(function () {
                resolve();
            }).catch(function (e) {
                reject(e);
            });
        });
    }

    module.exports = {
        getProfile: getProfile,
        updateProfile: updateProfile,
        changePassword: changePassword,
        verifyEmail: verifyEmail
    };

})(require);