import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {NgRedux} from '@angular-redux/store';
import {AppState} from '../store/Store';
import {ApiService} from './api.service';
import {User} from '../models';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends ApiService {

  user: User;

  constructor(private http: HttpClient, private ngRedux: NgRedux<AppState>) {
    super();
    this.ngRedux.select(state => state.users).subscribe(res => {
      this.user = res.loggedInUser;
    });
  }

  getUserById(id: string) {
    const url = 'https://kvalifik-ccc4d-default-rtdb.europe-west1.firebasedatabase.app/users/' + id + '.json';
    return this.http.get(url, this.getHttpOptions());
  }

  get getUser() {
    return this.user;
  }
}
