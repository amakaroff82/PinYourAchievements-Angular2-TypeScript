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
var di_1 = require('angular2/di');
var router_1 = require('angular2/router');
var achievementsService_1 = require('../../services/achievementsService');
var Login = (function () {
    function Login(router, achievementsService) {
        this.router = router;
        this.achievementsService = achievementsService;
    }
    Login.prototype.logIn = function (email, pass) {
        if (this.isValidMail(email)) {
            if (this.isValidPass(pass)) {
                this.achievementsService.hideShowHeader(true);
                localStorage.setItem('isLogin', true);
                this.router.parent.navigate('/home');
            }
            else {
                alert('Your password is incorrect');
            }
        }
        else {
            alert('Your email is incorrect');
        }
    };
    Login.prototype.isValidMail = function (email) {
        var valid = true;
        var emailRegEx = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
        if (!emailRegEx.test(email)) {
            valid = false;
        }
        return valid;
    };
    Login.prototype.isValidPass = function (password) {
        var valid = true;
        var re;
        var i = 0;
        if (password != "") {
            if (password < 6 && password > 15) {
                valid = false;
            }
            if (password.indexOf(' ') >= 0) {
                valid = false;
            }
            re = /[a-z]/;
            if (!re.test(password)) {
                valid = false;
            }
            else {
                i++;
            }
            re = /[0-9]/;
            if (!re.test(password)) {
                valid = false;
            }
            else {
                i++;
            }
            re = /[A-Z]/;
            if (!re.test(password)) {
                valid = false;
            }
            else {
                i++;
            }
            re = /[$@$!%*?&#]/;
            if (!re.test(password)) {
                valid = false;
            }
            else {
                i++;
            }
            if (i >= 2) {
                valid = true;
            }
        }
        else {
            valid = false;
            return valid;
        }
        if (!valid) {
            return false;
        }
        return valid;
    };
    Login = __decorate([
        angular2_1.Component({
            selector: 'login'
        }),
        angular2_1.View({
            templateUrl: settings_1._settings.buildPath + "/components/login/login.html",
            directives: [angular2_1.NgFor]
        }),
        __param(0, di_1.Inject(router_1.Router)),
        __param(1, di_1.Inject(achievementsService_1.AchievementsService))
    ], Login);
    return Login;
})();
exports.Login = Login;
//# sourceMappingURL=login.js.map