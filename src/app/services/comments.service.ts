import { Injectable } from '@angular/core';
import {ApiService} from './api.service';
import {HttpClient} from '@angular/common/http';
import {NgRedux} from '@angular-redux/store';
import {AppState} from '../store/Store';
import {Observable, of} from 'rxjs';
import {Comment, Post} from '../models';
import {catchError} from 'rxjs/operators';

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

    return this.http.get(url, this.getHttpOptions()).pipe(catchError(this.handleError(`post ${url}`, undefined)));
  }

  updateComment(comment: Comment): Observable<any> {
    console.log(comment.id);
    const url = 'https://kvalifik-ccc4d-default-rtdb.europe-west1.firebasedatabase.app/comments/' + comment.id + '.json';

    return this.http.patch(url, comment, this.getHttpOptions()).pipe(catchError(this.handleError(`post ${url}`, undefined)));
  }

  saveComment(comment: Comment): Observable<any> {
    const url = 'https://kvalifik-ccc4d-default-rtdb.europe-west1.firebasedatabase.app/comments.json';
    return this.http.post(url, comment, this.getHttpOptions()).pipe(catchError(this.handleError(`post ${url}`, undefined)));
  }

  deleteComment(comment: Comment): Observable<any> {
    const url = 'https://kvalifik-ccc4d-default-rtdb.europe-west1.firebasedatabase.app/comments/' + comment.id + '.json';
    return this.http.delete(url, this.getHttpOptions()).pipe(catchError(this.handleError(`post ${url}`, undefined)));
  }

  private handleError<T>(operation = 'operation', result?: T): any {
    return (error: any): Observable<T> => {
      console.error(error);
      console.error(operation + ' - ' + JSON.stringify(error));
      return of(result as T);
    };
  }
}
