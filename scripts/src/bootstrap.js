var angular2_1 = require('angular2/angular2');
var router_1 = require('angular2/router');
var achievementsService_1 = require('./services/achievementsService');
var api_1 = require('./services/api');
var HttpClient_1 = require('./services/HttpClient');
var http_1 = require('angular2/http');
var forms_1 = require('angular2/forms');
var app_1 = require('./components/app/app');
angular2_1.bootstrap(app_1.MyApp, [router_1.routerInjectables, http_1.httpInjectables, forms_1.formInjectables, achievementsService_1.AchievementsService, api_1.Api, HttpClient_1.HttpClient]);
//# sourceMappingURL=bootstrap.js.map