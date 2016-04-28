"use strict";

(function (require) {

    var _ = require('underscore');
    var achievementRepository = require("./../db/dataAccessLayers/achievementRepository");
    var requestFilter = require('./../requestFilter');

    var userIdTransformer = function (value) {
        return "#" + value;
    };

    module.exports = function (apiController) {
        return apiController({
            routePrefix: "api/users/:userId/achievements",
            actions: [
                {
                    method: "get",
                    paramsTransform: {
                        userId: userIdTransformer
                    },
                    filters: [
                        requestFilter.checkAuthorization(),
                        requestFilter.checkOwnerAccess("userId")
                    ],
                    handler: function () {
                        return achievementRepository.getAchievements();
                    }
                },
                {
                    method: "post",
                    params: [this.model(function (model) {
                        return JSON.parse(model);
                    })],
                    paramsTransform: {
                        userId: userIdTransformer
                    },
                    filters: [
                        requestFilter.checkAuthorization(),
                        requestFilter.checkOwnerAccess("userId")
                    ],
                    handler: function (model) {
                        return achievementRepository.addAchievement(model);
                    }
                },
                {
                    route: ":type",
                    method: "post",
                    params: ["type"],
                    paramsTransform: {
                        userId: userIdTransformer
                    },
                    filters: [
                        requestFilter.checkAuthorization(),
                        requestFilter.checkOwnerAccess("userId")
                    ],
                    handler: function (type) {
                        return achievementRepository.filterAchievements(type);
                    }
                }
            ]
        });
    };

})(require);