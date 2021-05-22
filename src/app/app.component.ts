import { Component } from '@angular/core';
import {LoginComponent} from './login/login.component';
import {AuthService} from './services/auth.service';
import {UserActions} from './store/actions/UserActions';
import {UsersService} from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent { // todo: find out how to see if logged in
  title = 'kvalifik';
  // loggedIn = false;

  constructor(private userService: UsersService) {
  }
}
