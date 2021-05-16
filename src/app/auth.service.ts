import { NgRedux } from '@angular-redux/store';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService } from './api.service';
import { AppState } from './store/Store';
import {catchError} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {User} from './models';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends ApiService {

  constructor(private http: HttpClient, private ngRedux: NgRedux<AppState>) {
    super();
  }

  getUserInfo(token: string) {
    const url = 'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=' + environment.apiKey;
    return this.http.post(url, {idToken: token}, this.getHttpOptions());
  }

  login(email: string, password: string) {
    const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.apiKey;
    return this.http.post(url, {email, password, returnSecureToken: true},
      this.getHttpOptions()).pipe(catchError(this.handleError(`post ${url}`, undefined)));
  }

  signup(username: string, password: string) {
    const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.apiKey;

    return this.http.post(url, {email: username, password, returnSecureToken: true},
      this.getHttpOptions());
  }

  private handleError<T>(operation = 'operation', result?: T): any {
    return (error: any): Observable<T> => {
      console.error(error);
      console.error(operation + ' - ' + JSON.stringify(error));
      return of(result as T);
    };
  }

}
