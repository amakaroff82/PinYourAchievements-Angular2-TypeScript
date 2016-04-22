"use strict";

(function () {

    var _config = null;

    module.exports = {
        useConfig: function (config) {
            _config = config;
            return config;
        },
        getConfig: function () {
            return _config;
        }
    };

})();