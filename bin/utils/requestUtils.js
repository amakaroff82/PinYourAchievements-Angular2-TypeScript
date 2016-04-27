"use strict";

(function (require) {

    var q = require("q");
    var promise = q["promise"];

    var authSessionProvider = require("./../providers/authSessionProvider");

    function getToken(request) {
        return request.cookies["x-access-token"];
    }

    function getAuthSession(request, onBadToken, onInvalidToken) {

        return promise(function (resolve, reject) {

            var token = getToken(request);
            if (token) {

                authSessionProvider.getAuthSessionByToken(token)
                    .then(function (authSession) {

                        if (authSession) {

                            resolve(authSession);
                        } else {

                            reject((onInvalidToken || function () {
                            })());
                        }
                    })
                    .catch(function (e) {
                        reject(e);
                    });
            } else {

                reject((onBadToken || function () {
                })());
            }
        });
    }

    module.exports = {
        getToken: getToken,
        getAuthSession: getAuthSession
    };

})(require);