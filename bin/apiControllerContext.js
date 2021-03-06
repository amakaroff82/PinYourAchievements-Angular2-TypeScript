"use strict";

(function (require) {

    var controllerUtils = require("./utils/controllerUtils");

    module.exports = {
        model: function (preProcess) {
            return new controllerUtils.RequestResolver("body", function (body) {
                if (typeof body === "string") {
                    return JSON.parse(body);
                }
                return body;
            });
        },
        query: function (name, preProcess) {
            return new controllerUtils.RequestResolver("query." + name, preProcess);
        },
        local: function (name, preProcess) {
            return new controllerUtils.RequestResolver("locals." + name, preProcess);
        }
    };

})(require);