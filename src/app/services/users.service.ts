import { Injectable } from '@angular/core';
import {Observable, Subject, timer} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {NgRedux} from '@angular-redux/store';
import {AppState} from '../store/Store';
import {ApiService} from './api.service';
import {Collection, User} from '../models';
import {switchMap, takeUntil} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends ApiService {

  private killSwitch = new Subject();
  user: User;

  constructor(private http: HttpClient, private ngRedux: NgRedux<AppState>) {
    super();
    this.ngRedux.select(state => state.users).subscribe(res => {
      this.user = res.loggedInUser;
    });
  }

  getUserById(id: string) {
    const url = 'https://kvalifik-ccc4d-default-rtdb.europe-west1.firebasedatabase.app/users/' + id + '.json';
    return timer(0, 600000)
      .pipe(
        switchMap(() => this.http.get<User>(url)),
        takeUntil(this.killSwitch)
      );
  }

  getUserByReferenceKey(refKey: string) {
    const url = 'https://kvalifik-ccc4d-default-rtdb.europe-west1.firebasedatabase.app/users.json?orderBy="referenceKey"&equalTo="' +
      refKey + '"&print="pretty"';
    return timer(0, 600000)
      .pipe(
        switchMap(() => this.http.get<User>(url)),
        takeUntil(this.killSwitch)
      );
  }

  get getUser() {
    return this.user;
  }
}
