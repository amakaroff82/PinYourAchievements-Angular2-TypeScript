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
var signup_1 = require('../signup/signup');
var achievementsService_1 = require('../../services/achievementsService');
var api_1 = require('../../services/api');
var MyApp = (function () {
    function MyApp(router, achievementsService, apiService) {
        var _this = this;
        this.achievementsService = achievementsService;
        this.apiService = apiService;
        this.isLogin = localStorage.getItem('userId') ? true : false;
        this.router = router;
        router.config([
            { path: '/login', as: 'login', component: login_1.Login, },
            { path: '/home', as: 'home', component: home_1.Home },
            { path: '/add', as: 'add', component: add_1.Add },
            { path: '/signup', as: 'signup', component: signup_1.SignUp }
        ]).then(function (_) {
            if (!localStorage.getItem('userId')) {
                router.navigate('/login');
            }
            else {
                router.navigate('/home');
            }
        });
        achievementsService.state.subscribe(function (newState) { return _this.isLogin = newState; });
    }
    MyApp.prototype.logOut = function () {
        var _this = this;
        this.apiService.logout().then(function (d) {
            if (d.status == 200) {
                localStorage.clear();
                _this.router.navigate('/login');
                _this.achievementsService.hideShowHeader(false);
            }
            else {
                console.error(result.statusText);
            }
        });
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
        __param(1, di_1.Inject(achievementsService_1.AchievementsService)),
        __param(2, di_1.Inject(api_1.Api))
    ], MyApp);
    return MyApp;
})();
exports.MyApp = MyApp;
//# sourceMappingURL=app.js.map