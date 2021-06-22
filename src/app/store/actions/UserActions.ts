import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { AppState } from './../Store';
import { AuthService} from '../../services/auth.service';
import {HttpClient} from '@angular/common/http';
import {User} from '../../models';
import {Subject} from 'rxjs';
import {UsersService} from '../../services/users.service';

@Injectable({ providedIn: 'root'})
export class UserActions {

    constructor(private ngRedux: NgRedux<AppState>,
                private authService: AuthService,
                private userService: UsersService)
    {}

  static SIGNED_UP: string = 'SIGNED_UP';
  static LOGGED_IN_GOOGLE: string = 'LOGGED_IN_GOOGLE';
  static LOGGED_IN: string = 'LOGGED_IN';
  currentUser: User;

  login(username: string, password: string) {
      this.authService.login(username, password).subscribe((result: any) => {

        if (result) {
          const user: User = {
            id: result.localId,
            username,
            email: username,
            signupDate: undefined
          } as User;
          this.currentUser = user;

          const googleToken = btoa(result.idToken); // encrypter googleToken
          sessionStorage.setItem('googleToken', JSON.stringify(googleToken)); // gemmer google token i storage :)

          this.authService.getUserInfo(result.idToken).subscribe((response: any) => {
            user.signupDate = new Date(Number(response.users[0].createdAt));

            this.ngRedux.dispatch({
              type: UserActions.LOGGED_IN,
              payload: {user, token: result.idToken}
            });
          });
        }
      });
  }

  signup(username: string, password: string): void {
    this.authService.signup(username, password).subscribe((res: any) => {
        // After you get a reponse from the server
        console.log('after getting a response');
        console.log(res);

        const user: User = {
          id: res.localId,
          firstName: '',
          email: username,
          role: 'student',
          username: '',
          profileImage: '',
          coverPhoto: '',
          signupDate: new Date(),
          title: ''
        } as User;

        this.ngRedux.dispatch({
          type: UserActions.SIGNED_UP,
          payload: {user, token: res.idToken}
      });
    });

    console.log('before getting a reponse');

    // Before you get a response from the server.
  }

  get isLoggedIn() {
    return this.currentUser;
  }
}
