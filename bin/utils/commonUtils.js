"use strict";

(function (require) {

    function resolveObject(object, path) {

        if (path) {

            try {
                return (function () {
                    return new Function("return this." + path);
                })().call(object);
            } catch (e) {
                return undefined;
            }
        }

        return object;
    }

    module.exports = {
        resolveObject: resolveObject
    };

})(require);