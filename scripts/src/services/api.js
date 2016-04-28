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
var http_1 = require('angular2/http');
var Api = (function () {
    function Api(http) {
        this.http = http;
    }
    Api.prototype.logIn = function (model) {
        var path = '/api/auth/signIn';
        return this.http.post(path, JSON.stringify(model));
    };
    Api.prototype.signUp = function (model) {
        var path = '/api/auth/signUp';
        return this.http.post(path, JSON.stringify(model));
    };
    Api.prototype.logout = function () {
        var path = '/api/auth/logout';
        return this.http.get(path);
    };
    Api = __decorate([
        __param(0, di_1.Inject(http_1.HttpClient))
    ], Api);
    return Api;
})();
exports.Api = Api;
//# sourceMappingURL=api.js.map