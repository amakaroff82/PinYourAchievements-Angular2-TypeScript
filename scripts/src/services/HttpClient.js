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
var HttpClient = (function () {
    function HttpClient(http) {
        this.http = http;
    }
    HttpClient.prototype.handleStatus = function (res) {
        if (res.status == 401) {
            alert('bad');
        }
        else {
            return res.json();
        }
    };
    HttpClient.prototype.get = function (url, options) {
        return this.http.get(url, options).map(this.handleStatus);
    };
    HttpClient.prototype.post = function (url, body, options) {
        return this.http.post(url, body, options).map(this.handleStatus);
    };
    HttpClient.prototype.put = function (url, body, options) {
    };
    HttpClient.prototype.delete = function (url, options) {
    };
    HttpClient.prototype.patch = function (url, body, options) {
    };
    HttpClient.prototype.head = function (url, options) {
    };
    HttpClient = __decorate([
        __param(0, di_1.Inject(http_1.Http))
    ], HttpClient);
    return HttpClient;
})();
exports.HttpClient = HttpClient;
//# sourceMappingURL=HttpClient.js.map