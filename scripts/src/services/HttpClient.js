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
var router_1 = require('angular2/router');
var achievementsService_1 = require('../services/achievementsService');
var HttpClient = (function () {
    function HttpClient($router, achievementsService) {
        this.$router = $router;
        this.achievementsService = achievementsService;
        this.$router = $router;
        this.achievementsService = achievementsService;
    }
    HttpClient.prototype.get = function (url) {
        return this._sendRequest(url, null, 'GET');
    };
    HttpClient.prototype.post = function (url, data) {
        return this._sendRequest(url, data, 'POST');
    };
    HttpClient.prototype.put = function (url, data) {
        return this._sendRequest(url, data, 'PUT');
    };
    HttpClient.prototype.delete = function (url, data) {
        return this._sendRequest(url, null, 'DELETE');
    };
    HttpClient.prototype._sendRequest = function (url, data, type) {
        return new Promise(function (resolve, reject) {
            var req = new XMLHttpRequest();
            req.open(type, url);
            req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            req.onload = function () {
                if (req.status == 400 || req.status == 401) {
                    localStorage.clear();
                    this.router.navigate('/login');
                    this.achievementsService.hideShowHeader(false);
                }
                if (req.status == 200) {
                    resolve(JSON.parse(req.response));
                }
                else {
                    reject(JSON.parse(req.response));
                }
            };
            req.onerror = function () {
                reject(JSON.parse(req.response));
            };
            if (data) {
                req.send(JSON.stringify(data));
            }
            else {
                req.send(null);
            }
        });
    };
    HttpClient = __decorate([
        __param(0, di_1.Inject(router_1.Router)),
        __param(1, di_1.Inject(achievementsService_1.AchievementsService))
    ], HttpClient);
    return HttpClient;
})();
exports.HttpClient = HttpClient;
//# sourceMappingURL=HttpClient.js.map