import {Component, View, NgFor} from 'angular2/angular2';
import { _settings } from '../../settings'
import {AchievementsService} from '../../services/achievementsService';
import {Inject} from 'angular2/di';

@Component({
    selector: 'login',
    injectables: [AchievementsService]
})
@View({
    templateUrl: _settings.buildPath + "/components/login/login.html",
    directives: [NgFor]
})
export class Login {

    constructor() {
    }
}