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
var angular2_1 = require('angular2/angular2');
var settings_1 = require('../../settings');
var achievementsService_1 = require('../../services/achievementsService');
var di_1 = require('angular2/di');
var Home = (function () {
    function Home(achievementsService) {
        var _this = this;
        this.achievementsService = achievementsService;
        achievementsService.getAllAchievements()
            .map(function (r) { return r.json(); })
            .subscribe(function (a) {
            _this.achievements = a;
        });
    }
    Home = __decorate([
        angular2_1.Component({
            selector: 'home',
            injectables: [achievementsService_1.AchievementsService]
        }),
        angular2_1.View({
            templateUrl: settings_1._settings.buildPath + "/components/home/home.html",
            directives: [angular2_1.NgFor]
        }),
        __param(0, di_1.Inject(achievementsService_1.AchievementsService))
    ], Home);
    return Home;
})();
exports.Home = Home;
//# sourceMappingURL=home.js.map