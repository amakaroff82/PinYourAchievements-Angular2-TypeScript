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
var forms_1 = require('angular2/forms');
var di_1 = require('angular2/di');
var router_1 = require('angular2/router');
var achievementsService_1 = require('../../services/achievementsService');
var Add = (function () {
    function Add(formBuilder, router, achievementsService) {
        this.formBuilder = formBuilder;
        this.router = router;
        this.achievementsService = achievementsService;
        this.addAchievementForm = formBuilder.group({
            title: [''],
            type: [''],
            from: ['']
        });
    }
    Add.prototype.addAchievement = function () {
        var _this = this;
        this.achievementsService.addAnAchievement(this.addAchievementForm.value)
            .map(function (r) { return r.json(); })
            .subscribe(function (result) {
            _this.router.parent.navigate('/home');
        });
    };
    Add = __decorate([
        angular2_1.Component({
            selector: 'add',
            injectables: [forms_1.FormBuilder]
        }),
        angular2_1.View({
            templateUrl: settings_1._settings.buildPath + '/components/add/add.html',
            directives: [forms_1.formDirectives]
        }),
        __param(0, di_1.Inject(forms_1.FormBuilder)),
        __param(1, di_1.Inject(router_1.Router)),
        __param(2, di_1.Inject(achievementsService_1.AchievementsService))
    ], Add);
    return Add;
})();
exports.Add = Add;
//# sourceMappingURL=add.js.map