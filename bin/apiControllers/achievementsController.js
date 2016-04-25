"use strict";

(function (require) {

    var _ = require('underscore');
    var achievementRepository = require("./../db/dataAccessLayers/achievementRepository");

    module.exports = function (apiController) {
        return apiController({
            routePrefix: "api/achievements",
            actions: [
                {
                    method: "get",
                    handler: function () {
                        return achievementRepository.getAchievements();
                    }
                },
                {
                    method: "post",
                    params: [this.model(function (model) {
                        return JSON.parse(model);
                    })],
                    handler: function (model) {
                        return achievementRepository.addAchievement(model);
                    }
                },
                {
                    route: ":type",
                    method: "post",
                    params: ["type"],
                    handler: function (type) {
                        return achievementRepository.filterAchievements(type);
                    }
                }
            ]
        });
    };

})(require);