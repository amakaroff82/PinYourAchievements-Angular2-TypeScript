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
var api_1 = require('../../services/api');
var SignUp = (function () {
    function SignUp(router, achievementsService, apiService) {
        this.router = router;
        this.achievementsService = achievementsService;
        this.apiService = apiService;
    }
    SignUp.prototype.backToLogin = function () {
        this.router.parent.navigate('/login');
    };
    SignUp.prototype.signUp = function (fname, lname, email, pass, confirmpass) {
        var _this = this;
        var model = {
            genericId: email,
            name: fname + " " + lname,
            password: pass,
            email: email
        };
        if (this.isValidData(fname, lname, email)) {
            if (this.isValidPassword(pass, confirmpass)) {
                this.apiService.signUp(model)
                    .map(function (r) { return r.json(); })
                    .subscribe(function (result) {
                    if (result.userId) {
                        localStorage.setItem('userId', result.userId);
                        _this.achievementsService.hideShowHeader(true);
                        _this.router.parent.navigate('/home');
                    }
                });
            }
            else {
                alert('Your password is incorrect');
            }
        }
        else {
            alert('Your data is incorrect');
        }
    };
    SignUp.prototype.isValidData = function (firstName, lastName, email) {
        var valid = true;
        var emailRegEx = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
        if (!firstName) {
            valid = false;
        }
        if (!lastName) {
            valid = false;
        }
        if (!emailRegEx.test(email)) {
            valid = false;
        }
        return valid;
    };
    SignUp.prototype.isValidPassword = function (password, confirmPassword) {
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
        if (password != confirmPassword) {
            valid = false;
        }
        return valid;
    };
    SignUp = __decorate([
        angular2_1.Component({
            selector: 'signup'
        }),
        angular2_1.View({
            templateUrl: settings_1._settings.buildPath + "/components/signup/signup.html",
            directives: [angular2_1.NgFor]
        }),
        __param(0, di_1.Inject(router_1.Router)),
        __param(1, di_1.Inject(achievementsService_1.AchievementsService)),
        __param(2, di_1.Inject(api_1.Api))
    ], SignUp);
    return SignUp;
})();
exports.SignUp = SignUp;
//# sourceMappingURL=signup.js.map