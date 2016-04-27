import {Component, View, NgFor} from 'angular2/angular2';
import { _settings } from '../../settings'
import {Inject} from 'angular2/di';
import {Router, RouteConfig, RouterLink, RouterOutlet} from 'angular2/router';
import {AchievementsService} from '../../services/achievementsService';

@Component({
    selector: 'signup'
})
@View({
    templateUrl: _settings.buildPath + "/components/signup/signup.html",
    directives: [NgFor]
})
export class SignUp {

    constructor(@Inject(Router) private router: Router,
                @Inject(AchievementsService) private achievementsService: AchievementsService) {
    }

    backToLogin(){
        this.router.parent.navigate('/login');
    }

    signUp(fname, lname, email, pass, confirmpass){

    }

    isValidMail(email){
        var valid = true;
        var emailRegEx = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
        if (!emailRegEx.test(email)) {
            valid = false;
        }
        return valid;
    }

    isValidPass(password){
        var valid = true;
        var re;
        var i = 0;
        if(password != "") {
            if(password < 6 && password > 15) {
                valid = false;
            }
            if(password.indexOf(' ') >= 0){
                valid = false;
            }
            re = /[a-z]/;
            if(!re.test(password)) {
                valid = false;
            }else{
                i++;
            }
            re = /[0-9]/;
            if(!re.test(password)) {
                valid = false;
            }else{
                i++;
            }
            re = /[A-Z]/;
            if(!re.test(password)) {
                valid = false;
            }else{
                i++;
            }
            re = /[$@$!%*?&#]/;
            if(!re.test(password)) {
                valid = false;
            }else{
                i++;
            }
            if(i >= 2){
                valid = true;
            }
        } else {
            valid = false;
            return valid;
        }
        if (!valid) {
            return false;
        }

        return valid;
    }
}