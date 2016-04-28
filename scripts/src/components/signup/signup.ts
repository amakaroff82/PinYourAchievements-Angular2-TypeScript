import {Component, View, NgFor} from 'angular2/angular2';
import { _settings } from '../../settings'
import {Inject} from 'angular2/di';
import {Router, RouteConfig, RouterLink, RouterOutlet} from 'angular2/router';
import {AchievementsService} from '../../services/achievementsService';
import {Api} from '../../services/api';
import {ObjectPreprocessor} from '../../services/ObjectPreprocessor';

@Component({
    selector: 'signup'
})
@View({
    templateUrl: _settings.buildPath + "/components/signup/signup.html",
    directives: [NgFor]
})
export class SignUp {

    constructor(@Inject(Router) private router:Router,
                @Inject(AchievementsService) private achievementsService:AchievementsService,
                @Inject(Api) private apiService: Api,
                @Inject(ObjectPreprocessor) private objectPreprocessor:ObjectPreprocessor) {
    }

    backToLogin() {
        this.router.parent.navigate('/login');
    }

    signUp(fname, lname, email, pass, confirmpass) {
        var model = {
            genericId: email,
            name: fname +" "+ lname,
            password: pass,
            email: email
        }
        if (this.isValidData(fname,lname,email)) {
            if (this.isValidPassword(pass,confirmpass)) {
                this.apiService.signUp(model)
                    .then(result => {
                        if(result.userId){

                            var Preprocessor = this.objectPreprocessor.getObjectPreprocessor();
                            var result = new Preprocessor({
                                userId: (userId) =>{
                                    return this.objectPreprocessor.parseRId(userId);
                                },
                            }).resolve(result);

                            localStorage.setItem('userId',result.userId);
                            this.achievementsService.hideShowHeader(true);
                            this.router.parent.navigate('/home');
                        }
                    }).catch((err)=>{
                    console.error(err);
                })
            }else{
                alert('Your password is incorrect')
            }
        } else {
            alert('Your data is incorrect')
        }

    }

    isValidData(firstName,lastName,email) {
        var valid = true;
        var emailRegEx = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
        if (!firstName) {
            valid = false;
        }
        if (!lastName) {
            valid = false;
        }
        if (!emailRegEx.test(email)) {
            valid = false;
        }
        return valid;
    }

    isValidPassword(password,confirmPassword) {
        var valid = true;
        var re;
        var i = 0;
        if (password != "") {
            if (password < 6 && password > 15) {
                valid = false;
            }
            if (password.indexOf(' ') >= 0) {
                valid = false;
            }
            re = /[a-z]/;
            if (!re.test(password)) {
                valid = false;
            } else {
                i++;
            }
            re = /[0-9]/;
            if (!re.test(password)) {
                valid = false;
            } else {
                i++;
            }
            re = /[A-Z]/;
            if (!re.test(password)) {
                valid = false;
            } else {
                i++;
            }
            re = /[$@$!%*?&#]/;
            if (!re.test(password)) {
                valid = false;
            } else {
                i++;
            }
            if (i >= 2) {
                valid = true;
            }
        } else {
            valid = false;
            return valid;
        }
        if (!valid) {
            return false;
        }
        if (password != confirmPassword) {
            valid = false;
        }
        return valid;
    }
}