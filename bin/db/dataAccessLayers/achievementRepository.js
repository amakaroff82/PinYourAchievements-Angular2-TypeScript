"use strict";

(function (require) {

    var _ = require("underscore");
    var promise = require("q")["promise"];
    var dbProvider = require("../dbProvider").usePath("sql/achievements/");
    var dbHelper = require("./../../utils/db/dbHelper");

    function getAchievements() {

        return promise(function (resolve, reject) {

            dbProvider.executeQuery("getAchievements.sql")
                .then(function (result) {

                    if (result.length > 0) {

                        var achievements = [];

                        _.forEach(result, function (achievement) {

                            achievements.push({
                                id: dbHelper.getRecordId(achievement),
                                title: achievement.title,
                                type: achievement.type,
                                from: achievement._from
                            });
                        });

                        resolve(achievements);
                    } else {

                        resolve([]);
                    }
                }, function (e) {

                    reject(e);
                });
        });
    }

    function addAchievement(model) {

        return promise(function (resolve, reject) {

            dbProvider.executeQuery("addAchievement.sql", model)
                .then(function () {

                    getAchievements().then(resolve, reject);
                }, function (e) {

                    reject(e);
                });
        });
    }

    function filterAchievements(type) {

        return promise(function (resolve, reject) {

            dbProvider.executeQuery("filterAchievements.sql", {
                type: type
            }).then(function (result) {

                if (result.length > 0) {

                    var achievements = [];

                    _.forEach(result, function (achievement) {

                        achievements.push({
                            id: dbHelper.getRecordId(achievement),
                            title: achievement.title,
                            type: achievement.type,
                            from: achievement._from
                        });
                    });

                    resolve(achievements);
                } else {

                    resolve([]);
                }
            }, function (e) {

                reject(e);
            });
        });
    }

    module.exports = {
        getAchievements: getAchievements,
        addAchievement: addAchievement,
        filterAchievements: filterAchievements
    };

})(require);