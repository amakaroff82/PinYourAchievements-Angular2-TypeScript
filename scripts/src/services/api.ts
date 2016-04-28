import {Component, View} from 'angular2/angular2';
import { Inject} from 'angular2/di';
import {HttpClient} from '../services/HttpClient';
import {Observable} from 'rxjs/Observable';
import Observable = Rx.Observable;

export class Api {

    constructor( @Inject(HttpClient) private http: HttpClient) {
    }

    logIn(model) {
        var path = '/api/auth/signIn';
        return this.http.post(path, JSON.stringify(model));
    }

    signUp(model) {
        var path = '/api/auth/signUp';
        return this.http.post(path, JSON.stringify(model));
    }

    logout(){
        var path = '/api/auth/logout';
        return this.http.get(path);
    }
}