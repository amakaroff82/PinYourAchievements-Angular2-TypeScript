"use strict";

(function (require) {

    var Q = require('q');
    var Promise = Q['promise'];
    var _ = require('underscore');
    var DbHelper = require('../utils/db/dbHelper');

    var developmentMode = true;
    var databaseConfig = {
        name: "demo",
        username: "admin",
        password: "admin"
    };
    var serverConfig = {
        username: 'root',
        password: 'DCBB1E709B257231C1112BD12B7F255AD9BC7E362D4D0561C0F53257B9F7E76F'
    };

    module.exports = {
        getConnection: (function () {

            function formatQuery(queryTemplate, scope) {
                return DbHelper.formatQuery(queryTemplate, scope || {});
            }

            var protocols = {
                'binary': (function () {

                    var Oriento = require('oriento');

                    var connectionRequest = null;
                    var connection = null;

                    return function () {

                        if (connection) {
                            return Q.when(connection);
                        }

                        if (connectionRequest) {

                            return connectionRequest;
                        } else {

                            connectionRequest = Promise(function (resolve, reject) {

                                var server = Oriento({
                                    host: "localhost",
                                    port: 2424,
                                    username: serverConfig.username,
                                    password: serverConfig.password
                                });

                                var db = server.use(databaseConfig);

                                connectionRequest = null;
                                connection = {
                                    executeQuery: function (queryTemplate, scope) {
                                        var query = formatQuery(queryTemplate, scope);
                                        return db.query(query);
                                    }
                                };

                                console.log('Binary database connection successfully established');

                                resolve(connection);
                            });

                            return connectionRequest;
                        }
                    };
                })(),
                'http': (function () {

                    var OrientDbHttp = require('node-orientdb-http');

                    var connectionRequest = null;
                    var connection = null;

                    return function () {

                        if (connection) {
                            return Q.when(connection);
                        }

                        if (connectionRequest) {

                            return connectionRequest;
                        } else {

                            connectionRequest = Promise(function (resolve, reject) {

                                var db = OrientDbHttp.connect({
                                    host: "http://localhost:2480",
                                    user: serverConfig.username,
                                    password: serverConfig.password,
                                    database: databaseConfig.name
                                });

                                db.on('connect', function () {

                                    connectionRequest = null;
                                    connection = {
                                        executeQuery: function (queryTemplate, scope) {

                                            var query = formatQuery(queryTemplate, scope);

                                            return Promise(function (resolve, reject) {
                                                db.command(query)
                                                    .then(function (response) {
                                                        var result = response.result || [];
                                                        resolve(result);
                                                    })
                                                    .catch(function (e) {
                                                        reject(e);
                                                    });
                                            });
                                        }
                                    };

                                    console.log('Http database connection successfully established');

                                    resolve(connection);
                                });

                                db.on('error', function (e) {
                                    reject(e);
                                });
                            });

                            return connectionRequest;
                        }
                    };
                })()
            };

            return function (protocol) {
                return (protocols[protocol] || function () {
                    throw 'Invalid protocol: ' + protocol;
                })();
            };
        })()
    };

})(require);