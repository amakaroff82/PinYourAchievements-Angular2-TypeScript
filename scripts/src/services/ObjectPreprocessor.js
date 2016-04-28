var underscore_1 = require('underscore/underscore');
var ObjectPreprocessor = (function () {
    function ObjectPreprocessor() {
    }
    ObjectPreprocessor.prototype.getObjectPreprocessor = function () {
        debugger;
        function ObjectPreprocessor(preprocessors) {
            this.preprocessors = preprocessors;
        }
        ObjectPreprocessor.prototype = {
            constructor: ObjectPreprocessor,
            resolve: function (object) {
                if (!object) {
                    return;
                }
                underscore_1._.forEach(this.preprocessors, function (fn, propertyName) {
                    if (underscore_1._.isArray(object)) {
                        underscore_1._.forEach(object, function (element, index, array) {
                            array[index][propertyName] = fn(element[propertyName]);
                        });
                    }
                    else {
                        object[propertyName] = fn(object[propertyName]);
                    }
                });
                return object;
            }
        };
        return ObjectPreprocessor;
    };
    return ObjectPreprocessor;
})();
exports.ObjectPreprocessor = ObjectPreprocessor;
//# sourceMappingURL=ObjectPreprocessor.js.map