import { Injectable } from '@angular/core';
import {ApiService} from './api.service';
import {HttpClient} from '@angular/common/http';
import {NgRedux} from '@angular-redux/store';
import {AppState} from '../store/Store';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentsService extends ApiService {

  constructor(private http: HttpClient, private ngRedux: NgRedux<AppState>) {
    super();
  }

  readComments(): Observable<any> {
    // const token = this.ngRedux.getState().users.token;
    const url = 'https://kvalifik-ccc4d-default-rtdb.europe-west1.firebasedatabase.app/comments.json';

    return this.http.get(url, this.getHttpOptions());
  }
}
