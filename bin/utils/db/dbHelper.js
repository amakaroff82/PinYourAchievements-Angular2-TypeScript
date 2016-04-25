"use strict";

(function (require) {

    var _ = require('underscore');

    function getRecordId(property) {
        if (property) {
            return (property['rid'] || property['@rid']).toString();
        }
    }

    var formatQuery = (function () {

        return function (queryTemplate, scope) {
            return queryTemplate(_.extend(scope, {
                _: _
            }));
        };
    })();

    module.exports = {
        getRecordId: getRecordId,
        formatQuery: formatQuery
    };

})(require);