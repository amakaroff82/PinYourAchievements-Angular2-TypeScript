"use strict";

(function (require) {

    var _ = require('underscore');
    var ResourcesManager = require('./../utils/resourcesManager');
    var Q = require('q');
    var Promise = Q['promise'];

    var cache = {};

    module.exports = {
        getQuery: function (fileName) {

            if (cache[fileName]) {
                return Q.when(cache[fileName]);
            }

            return Promise(function (resolve, reject) {

                ResourcesManager.getResourceAsStringAsync(fileName)
                    .then(function (query) {

                        var template = _.template(query.replace(/[\n\r\t]/g, ' '));

                        cache[fileName] = function (scope) {

                            console.log(_.template(query)(scope));

                            return template(scope);
                        };

                        resolve(cache[fileName]);
                    })
                    .catch(function (e) {
                        reject(e);
                    });
            });
        },
        usePath: function (path) {
            var context = this;
            return {
                getQuery: function (fileName) {
                    return context.getQuery(path + fileName);
                },
                usePath: function (subPath) {
                    return context.usePath(path + subPath);
                }
            }
        }
    };

})(require);