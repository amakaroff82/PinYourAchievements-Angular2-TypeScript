import {Component, View, NgFor} from 'angular2/angular2';
import { _settings } from '../../settings'
import {Inject} from 'angular2/di';
import {Router, RouteConfig, RouterLink, RouterOutlet} from 'angular2/router';
import {AchievementsService} from '../../services/achievementsService';
import {Api} from '../../services/api';

@Component({
    selector: 'login'
})
@View({
    templateUrl: _settings.buildPath + "/components/login/login.html",
    directives: [NgFor]
})
export class Login {

    constructor(@Inject(Router) private router:Router,
                @Inject(AchievementsService) private achievementsService:AchievementsService,
                @Inject(Api) private apiService:Api) {
        this.achievementsService.hideShowHeader(false);
        localStorage.clear();
    }

    goSignUp(){
        this.router.parent.navigate('/signup');
    }

    logIn(email,pass){
        var model = {
            email: email,
            password: pass
        }
        if (this.isValidMail(email)) {
                this.apiService.logIn(model)
                    .then(result => {
                        if (!result.message) {
                            localStorage.setItem('userId',result.userId);
                            this.achievementsService.hideShowHeader(true);
                            this.router.parent.navigate('/home');
                        }else{
                            alert(result.message)
                        }
                    }).catch((err)=>{
                    console.error(err);
                })

        } else {
            alert('Your email is incorrect')
        }
    }
    isValidMail(email){
        var valid = true;
        var emailRegEx = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
        if (!emailRegEx.test(email)) {
            valid = false;
        }
        return valid;
    }
}