"use strict";

(function (require) {

    var fs = require("fs");
    var _ = require("underscore");
    var glob = require("glob");
    var apiControllerContext = require("./apiControllerContext");

    module.exports = function (app) {

        var apiController = require("./apiController")(app);
        var files = glob("./bin/apiControllers/**/*Controller.js", {
            sync: true
        });

        _.forEach(files, function (file) {
            require("." + file).apply(apiControllerContext, [apiController]);
            console.info("API controller [." + file + "] successfully initialized");
        });
    };

})(require);