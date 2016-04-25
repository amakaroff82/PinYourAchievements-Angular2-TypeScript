"use strict";

(function (require) {

    var Promise = require('q')['promise'];
    var QueriesCache = require('./queriesCache');
    var DbConnector = require('./dbConnector');

    module.exports = {
        executeQuery: function (queryFileName, scope) {

            return Promise(function (resolve, reject) {

                QueriesCache.getQuery(queryFileName)
                    .then(function (queryTemplate) {

                        DbConnector.getConnection('http')
                            .then(function (connection) {

                                connection.executeQuery(queryTemplate, scope)
                                    .then(function (obj) {
                                        resolve(obj);
                                    })
                                    .catch(function (e) {
                                        reject(e);
                                    });
                            })
                            .catch(function (e) {
                                reject(e);
                            });
                    })
                    .catch(function (e) {
                        reject(e);
                    });
            });
        },
        usePath: function (path) {
            var context = this;
            return {
                executeQuery: function (queryFileName, options) {
                    return context.executeQuery(path + queryFileName, options);
                },
                usePath: function (subPath) {
                    return context.usePath(path + subPath);
                }
            };
        }
    };

})(require);