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
              private ngRedux: NgRedux<AppState>) {
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
      this.router.navigate(['/posts']); // todo: dashboard
      // let test = ;
    }
    // this.ngRedux.select(state => state.users).subscribe(res => {
    //   this.user = res.loggedInUser;
    //   console.log(this.user);
    //   // console.log(this.posts);
    // });
    // console.log(this.userActions.test() + '<<-');
    // if(this.userActions.logged) {
    //   console.log('YOURE IN');
    // }
  }
}
