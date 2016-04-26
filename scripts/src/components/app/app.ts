import {Component, View} from 'angular2/angular2';
import {Router, RouteConfig, RouterLink, RouterOutlet} from 'angular2/router';
import {Inject} from 'angular2/di';

import { _settings } from '../../settings';
import {Home} from '../home/home';
import {Add} from '../add/add';
import {Login} from '../login/login';
import {AchievementsService} from '../../services/achievementsService';

@Component({
  selector: 'my-app'
})
@View({
  templateUrl: _settings.buildPath + '/components/app/app.html',
  directives: [RouterLink, RouterOutlet]
})
export class MyApp {
  isLogin:boolean = localStorage.getItem('isLogin') == "true" ? true :false;

  constructor(@Inject(Router) router: Router,
              @Inject(AchievementsService) private achievementsService: AchievementsService) {
    this.router = router;
    router.config([
      { path: '/login', as: 'login', component: Login,},
      { path: '/home', as: 'home', component: Home },
      { path: '/add', as: 'add', component: Add }
    ]).then((_) => {
      if(!localStorage.getItem('isLogin')) {
        router.navigate('/login')
      }else{
        router.navigate('/home')
      }
    })

    achievementsService.state.subscribe(newState => this.isLogin = newState)
  }

  logOut(){
    this.achievementsService.hideShowHeader(false);
    localStorage.removeItem('isLogin');
     this.router.navigate('/login');
  }
}
