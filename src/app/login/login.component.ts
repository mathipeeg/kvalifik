import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserActions } from '../store/actions/UserActions';
import {Observable, Subject} from 'rxjs';
import {User} from '../models';
import {map, startWith, switchMap, takeUntil, withLatestFrom} from 'rxjs/operators';
import {AuthService} from '../services/auth.service';
import {NgRedux} from '@angular-redux/store';
import {AppState} from '../store/Store';
import {DataSharingService} from '../app.component';
import {UsersService} from '../services/users.service';

@Component({
  selector: 'app-login', // name of component
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  user: User;

  constructor(private fb: FormBuilder,
              private router: Router,
              private userActions: UserActions,
              private ngRedux: NgRedux<AppState>,
              private authService: AuthService,
              private userService: UsersService,
              private dataSharingService: DataSharingService) {
  }

  ngOnInit() {
    this.loginForm = this.fb.group(
      {
        username: ['', [Validators.required, Validators.minLength(3)]], // multiple validators
        password: ['', Validators.required] // Single validator
      }
    )
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.userActions.login(this.loginForm.value.username, this.loginForm.value.password);
      this.dataSharingService.isUserLoggedIn.next(true);
      if(sessionStorage.getItem('googleToken')) {
        this.authService.getUserInfo(atob(JSON.parse(sessionStorage.getItem('googleToken')))).subscribe(googleUser => {
          const localId = googleUser['users'][0].localId;
          this.userService.getUserByReferenceKey(localId).subscribe(user => {
            for (const id in user) {
              this.user = user[id];
            }
            this.dataSharingService.title.next(this.user.title);
          })
        });
      }
      this.router.navigate(['/'], );
    }
  }
}
