"use strict";

(function (require) {

    var commonUtils = require("./commonUtils");

    function RequestResolver(path, preProcess) {
        this.path = path || "";
        this.preProcess = preProcess || function (object) {
            return object;
        };
    }

    RequestResolver.prototype = {
        resolve: function (request) {
            var object = commonUtils.resolveObject(request, this.path);
            return this.preProcess(object);
        }
    };

    function ResponseResolver(path, preProcess) {
        this.path = path || "";
        this.preProcess = preProcess || function (object) {
            return object;
        };
    }

    ResponseResolver.prototype = {
        resolve: function (response) {
            var object = commonUtils.resolveObject(response, this.path);
            return this.preProcess(object);
        }
    };

    module.exports = {
        RequestResolver: RequestResolver,
        ResponseResolver: ResponseResolver
    };

})(require);