import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {ApiService} from './api.service';
import {HttpClient} from '@angular/common/http';
import {NgRedux} from '@angular-redux/store';
import {AppState} from '../store/Store';

@Injectable({
  providedIn: 'root'
})
export class VolunteerService extends ApiService {

  constructor(private http: HttpClient, private ngRedux: NgRedux<AppState>) {
    super();
  }

  readVolunteers(): Observable<any> {
    // const token = this.ngRedux.getState().users.token;
    const url = 'https://kvalifik-ccc4d-default-rtdb.europe-west1.firebasedatabase.app/volunteers.json';
    return this.http.get(url, this.getHttpOptions());
  }
}
