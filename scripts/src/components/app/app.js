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
var router_1 = require('angular2/router');
var di_1 = require('angular2/di');
var settings_1 = require('../../settings');
var home_1 = require('../home/home');
var add_1 = require('../add/add');
var login_1 = require('../login/login');
var achievementsService_1 = require('../../services/achievementsService');
var MyApp = (function () {
    function MyApp(router, achievementsService) {
        var _this = this;
        this.achievementsService = achievementsService;
        this.isLogin = localStorage.getItem('isLogin') == "true" ? true : false;
        this.router = router;
        router.config([
            { path: '/login', as: 'login', component: login_1.Login, },
            { path: '/home', as: 'home', component: home_1.Home },
            { path: '/add', as: 'add', component: add_1.Add }
        ]).then(function (_) {
            if (!localStorage.getItem('isLogin')) {
                router.navigate('/login');
            }
            else {
                router.navigate('/home');
            }
        });
        achievementsService.state.subscribe(function (newState) { return _this.isLogin = newState; });
    }
    MyApp.prototype.logOut = function () {
        this.achievementsService.hideShowHeader(false);
        localStorage.removeItem('isLogin');
        this.router.navigate('/login');
    };
    MyApp = __decorate([
        angular2_1.Component({
            selector: 'my-app'
        }),
        angular2_1.View({
            templateUrl: settings_1._settings.buildPath + '/components/app/app.html',
            directives: [router_1.RouterLink, router_1.RouterOutlet]
        }),
        __param(0, di_1.Inject(router_1.Router)),
        __param(1, di_1.Inject(achievementsService_1.AchievementsService))
    ], MyApp);
    return MyApp;
})();
exports.MyApp = MyApp;
//# sourceMappingURL=app.js.map