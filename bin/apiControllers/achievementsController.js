"use strict";

(function (require) {

    var _ = require('underscore');

    var achievements = [
        {
            title: 'Received Microsoft MVP Award',
            type: 'major',
            from: 'Microsoft'
        },
        {
            title: 'Approved as SitePoint author',
            type: 'major',
            from: 'SitePoint'
        },
        {
            title: 'Approved as DotnetCurry author',
            type: 'major',
            from: 'DotnetCurry'
        },
        {
            title: 'Mention on ASP.NET',
            type: 'medium',
            from: 'asp.net'
        },
        {
            title: 'First article published on SitePoint',
            type: 'minor',
            from: 'SitePoint'
        },
        {
            title: 'Got a side project',
            type: 'minor',
            from: 'Self'
        },
        {
            title: 'Boss patted me for my work',
            type: 'minor',
            from: 'Boss'
        }
    ];

    module.exports = function (apiController) {
        return apiController({
            routePrefix: "api/achievements",
            actions: [
                {
                    method: "get",
                    handler: function () {
                        return achievements;
                    }
                },
                {
                    method: "post",
                    params: [this.model(function (model) {
                        return JSON.parse(model);
                    })],
                    handler: function (model) {
                        achievements.push(model);
                        return achievements;
                    }
                },
                {
                    route: ":type",
                    method: "post",
                    params: ["type"],
                    handler: function (type) {
                        return _.filter(achievements, function (a) {
                            return a.type === type;
                        });
                    }
                }
            ]
        });
    };

})(require);