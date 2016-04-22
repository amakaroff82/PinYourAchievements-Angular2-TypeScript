"use strict";

(function (require) {

    var path = require("path");
    var _ = require("underscore");

    var rootDirectory = path.resolve("./");

    module.exports = function (app, io, config) {

        app.get("/", (function () {

            var glob = require("glob");

            var content = config.content;
            var basePath = path.resolve(rootDirectory + "/public");
            var result = {
                styles: loadFiles(content.styles, "styles"),
                scripts: loadFiles(content.scripts, "scripts"),
                images: loadFiles(content.images, "images")
            };

            function loadFiles(patterns, tag) {

                var files = [];

                _.forEach(patterns, function (pattern) {

                    _.forEach(glob(pattern, {
                        cwd: basePath,
                        sync: true
                    }), function (file) {

                        if (_.indexOf(files, file) == -1) {
                            files.push(file);
                        }
                    });
                });

                console.log("[" + tag + "]: find " + files.length + " file(s)");

                return files;
            }

            return function (request, response) {
                response.render("index.ejs", {
                    _: _,
                    styles: result.styles,
                    scripts: result.scripts,
                    images: result.images
                });
            }
        })());
    };

})(require);