import {Component, View} from 'angular2/angular2';
import {Router, RouteConfig, RouterLink, RouterOutlet} from 'angular2/router';
import {Inject} from 'angular2/di';

import { _settings } from '../../settings';
import {Home} from '../home/home';
import {Add} from '../add/add';
import {Login} from '../login/login';
import {SignUp} from '../signup/signup';
import {AchievementsService} from '../../services/achievementsService';
import {Api} from '../../services/api';

@Component({
  selector: 'my-app'
})
@View({
  templateUrl: _settings.buildPath + '/components/app/app.html',
  directives: [RouterLink, RouterOutlet]
})
export class MyApp {
  isLogin:boolean = localStorage.getItem('userId') ? true :false;

  constructor(@Inject(Router) router: Router,
              @Inject(AchievementsService) private achievementsService: AchievementsService,
              @Inject(Api) private apiService: Api) {
    this.router = router;
    router.config([
      { path: '/login', as: 'login', component: Login,},
      { path: '/home', as: 'home', component: Home },
      { path: '/add', as: 'add', component: Add },
      { path: '/signup', as: 'signup', component: SignUp }
    ]).then((_) => {
      if(!localStorage.getItem('userId')) {
        router.navigate('/login')
      }else{
        router.navigate('/home')
      }
    })

    achievementsService.state.subscribe(newState => this.isLogin = newState)
  }

  logOut() {
    this.apiService.logout().then(d=>{
        this.router.navigate('/login');
    }).catch((err)=>{
      console.error(err);
    })
  }
}
