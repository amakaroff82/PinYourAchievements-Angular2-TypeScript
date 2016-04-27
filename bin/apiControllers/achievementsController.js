"use strict";

(function (require) {

    var _ = require('underscore');
    var achievementRepository = require("./../db/dataAccessLayers/achievementRepository");
    var requestFilter = require('./../requestFilter');

    module.exports = function (apiController) {
        return apiController({
            routePrefix: "api/achievements",
            actions: [
                {
                    method: "get",
                    filters: [
                        requestFilter.checkAuthorization()
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
                    filters: [
                        requestFilter.checkAuthorization()
                    ],
                    handler: function (model) {
                        return achievementRepository.addAchievement(model);
                    }
                },
                {
                    route: ":type",
                    method: "post",
                    params: ["type"],
                    filters: [
                        requestFilter.checkAuthorization()
                    ],
                    handler: function (type) {
                        return achievementRepository.filterAchievements(type);
                    }
                }
            ]
        });
    };

})(require);