import { Component } from '@angular/core';
import {LoginComponent} from './login/login.component';
import {AuthService} from './auth.service';
import {UserActions} from './store/actions/UserActions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent { // todo: find out how to see if logged in
  title = 'kvalifik';

  constructor(private userActions: UserActions) {
    console.log(userActions.isLoggedIn);
  }
}
