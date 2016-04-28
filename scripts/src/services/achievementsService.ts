import {Component, View} from 'angular2/angular2';
import { Inject} from 'angular2/di';
import {HttpClient} from '../services/HttpClient';
import {Observable} from 'rxjs/Observable';
import Observable = Rx.Observable;

export class AchievementsService {
	public state: any;
	private stateObservable:any;

	constructor( @Inject(HttpClient) private http: HttpClient) {
		this.state = new Observable(observer =>
				this.stateObservable = observer);
	}

	getAchievementsOfType(type: string) : any {
		var path = '/api/achievements/' + type;
		return this.http.get(path);
	}

	getAllAchievements() : any {
		var path = '/api/achievements';
		return this.http.get(path);
	}

	addAnAchievement(newAchievement) {
		var path = '/api/achievements';
		return this.http.post(path, JSON.stringify(newAchievement));
	}

	hideShowHeader(state) {
		this.stateObservable.next(state);
		console.log(state);
		//hide or show header
	}

}