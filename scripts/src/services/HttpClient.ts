import {Component, View} from 'angular2/angular2';
import {Inject} from 'angular2/di';
import {Observable} from 'rxjs/Observable';
import {Router, RouteConfig, RouterLink, RouterOutlet} from 'angular2/router';
import Observable = Rx.Observable;

export class HttpClient {

    constructor(@Inject(Router) private $router:Router) {
        this.$router = $router;
    }

    get(url:string) {
        return this._sendRequest(url, null, 'GET');
    }

    post(url:string, data:any) {
        return this._sendRequest(url, data, 'POST');
    }

    put(url:string, data:any) {
        return this._sendRequest(url, data, 'PUT');
    }

    delete(url:string, data:any) {
        return this._sendRequest(url, null, 'DELETE');
    }

    private _sendRequest(url:string, data:any, type:string):Promise {
        var Router = this.$router;
        return new Promise(function (resolve, reject) {
            var req = new XMLHttpRequest();
            req.open(type, url);
            req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

            req.onload = function () {
                if (req.response) {
                    var response = JSON.parse(req.response)
                }
                if (req.status == 401) {
                    Router.navigate('/login');
                } else {
                    if (req.status == 200) {
                        resolve(response);
                    } else {
                        reject(response);
                    }
                }
            };

            req.onerror = function () {
                reject(JSON.parse(req.response));
            };

            if (data) {
                req.send(data);
            } else {
                req.send(null);
            }
        });
    }
}