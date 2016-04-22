"use strict";

(function (require) {

    var promise = require("q")["promise"];
    var fs = require("fs");
    var path = require("path");

    var resourcesDirectory = path.join(__dirname, "../../resources");

    module.exports = {
        getResourceAsStringAsync: function (fileName) {

            return promise(function (resolve, reject) {

                fs.readFile(resourcesDirectory + "/" + fileName, "utf8", function (error, file) {

                    if (error) {
                        reject(error);
                    } else {
                        resolve(file);
                    }
                });
            });
        },
        getResourceAsString: function (fileName) {
            return fs.readFileSync(resourcesDirectory + "/" + fileName, "utf8");
        }
    };

})(require);