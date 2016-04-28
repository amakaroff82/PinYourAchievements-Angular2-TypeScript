var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var di_1 = require('angular2/di');
var HttpClient_1 = require('../services/HttpClient');
var Observable_1 = require('rxjs/Observable');
var AchievementsService = (function () {
    function AchievementsService(http) {
        var _this = this;
        this.http = http;
        this.state = new Observable_1.Observable(function (observer) {
            return _this.stateObservable = observer;
        });
    }
    AchievementsService.prototype.getAchievementsOfType = function (type) {
        var path = '/api/achievements/' + type;
        return this.http.get(path);
    };
    AchievementsService.prototype.getAllAchievements = function () {
        var path = '/api/achievements';
        return this.http.get(path);
    };
    AchievementsService.prototype.addAnAchievement = function (newAchievement) {
        var path = '/api/achievements';
        return this.http.post(path, JSON.stringify(newAchievement));
    };
    AchievementsService.prototype.hideShowHeader = function (state) {
        this.stateObservable.next(state);
        console.log(state);
    };
    AchievementsService = __decorate([
        __param(0, di_1.Inject(HttpClient_1.HttpClient))
    ], AchievementsService);
    return AchievementsService;
})();
exports.AchievementsService = AchievementsService;
//# sourceMappingURL=achievementsService.js.map