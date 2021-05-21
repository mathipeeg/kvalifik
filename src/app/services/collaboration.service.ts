import { Injectable } from '@angular/core';
import {ApiService} from './api.service';
import {HttpClient} from '@angular/common/http';
import {NgRedux} from '@angular-redux/store';
import {AppState} from '../store/Store';
import {Observable, of, Subject} from 'rxjs';
import {Collaboration, Collection, Post} from '../models';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CollaborationService extends ApiService {

  private killSwitch = new Subject();
  baseUrl = 'https://kvalifik-ccc4d-default-rtdb.europe-west1.firebasedatabase.app/collaborations';

  constructor(private http: HttpClient, private ngRedux: NgRedux<AppState>) {
    super();
  }

  readCollaborations(): Observable<any> {
    const url = 'https://kvalifik-ccc4d-default-rtdb.europe-west1.firebasedatabase.app/collaborations.json';
    return this.http.get(url, this.getHttpOptions());
  }

  getCollabById(id: string): Observable<any> {
    const url = 'https://kvalifik-ccc4d-default-rtdb.europe-west1.firebasedatabase.app/collaborations/' + id + '.json';
    return this.http.get(url, this.getHttpOptions());
  }

  // not redux below

  saveCollaboration(collab: Collaboration): Observable<Collaboration | undefined> {
    console.log(collab);
    return this.http.post<Collaboration>(`${this.baseUrl}.json`, collab)
      .pipe(
        catchError(this.handleError(`post ${this.baseUrl}.json`, undefined))
      );
  }

  updateCollaboration(id: string, coll: Collaboration): Observable<boolean | undefined> {
    return this.http.patch<boolean>(`${this.baseUrl}/${id}.json`, coll)
      .pipe(
        catchError(this.handleError(`post ${this.baseUrl}/${id}.json`, undefined)),
      );
  }

  deleteCollaboration(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}.json`)
      .pipe(
        catchError(this.handleError(`post url`, undefined))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.error(operation + ' - ' + JSON.stringify(error));
      return of(result as T);
    };
  }
}
