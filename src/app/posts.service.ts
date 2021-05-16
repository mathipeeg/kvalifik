import { NgRedux } from '@angular-redux/store';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { AppState } from './store/Store';
import {Observable} from 'rxjs';
import {Post} from './models';

@Injectable({
  providedIn: 'root'
})
export class PostsService extends ApiService {

  constructor(private http: HttpClient, private ngRedux: NgRedux<AppState>) {
    super();
  }

  savePost(post: Post): Observable<any> {
    const token = this.ngRedux.getState().users.token;
    console.log(post);
    const url = 'https://kvalifik-ccc4d-default-rtdb.europe-west1.firebasedatabase.app/posts.json'; // ?auth=' + token; //todo: find out how

    return this.http.post(url, post, this.getHttpOptions());
    // "https://<DATABASE_NAME>.firebaseio.com/users/ada/name.json?auth=<ID_TOKEN>"
  }

  updatePost(post: Post): Observable<any> {
    const token = this.ngRedux.getState().users.token;
    const url = 'https://kvalifik-ccc4d-default-rtdb.europe-west1.firebasedatabase.app/posts/' + post.id + '.json';
    // ?auth=' + token; //todo: find out how

    return this.http.patch(url, post, this.getHttpOptions());
    // "https://<DATABASE_NAME>.firebaseio.com/users/ada/name.json?auth=<ID_TOKEN>"
  }

  readPosts(): Observable<any> {
    const token = this.ngRedux.getState().users.token;
    const url = 'https://kvalifik-ccc4d-default-rtdb.europe-west1.firebasedatabase.app/posts.json';

    return this.http.get(url, this.getHttpOptions());
  }

  deletePost(post: Post): Observable<any> {
    const token = this.ngRedux.getState().users.token;
    const url = 'https://kvalifik-ccc4d-default-rtdb.europe-west1.firebasedatabase.app/posts' + post.id + '.json';

    return this.http.delete(url, this.getHttpOptions());
  }
}
