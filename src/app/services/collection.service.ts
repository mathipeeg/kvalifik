import { Injectable } from '@angular/core';
import {ApiService} from './api.service';
import {HttpClient} from '@angular/common/http';
import {NgRedux} from '@angular-redux/store';
import {AppState} from '../store/Store';
import {Observable, of, Subject, timer} from 'rxjs';
import {Collection} from '../models';
import {catchError, switchMap, takeUntil} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CollectionService extends ApiService {

  private killSwitch = new Subject();
  baseUrl = 'https://kvalifik-ccc4d-default-rtdb.europe-west1.firebasedatabase.app/collections';

  constructor(private http: HttpClient, private ngRedux: NgRedux<AppState>) {
    super();
  }

  readCollections(): Observable<any> {
    // const token = this.ngRedux.getState().users.token;
    const url = 'https://kvalifik-ccc4d-default-rtdb.europe-west1.firebasedatabase.app/collections.json';

    return this.http.get(url, this.getHttpOptions());
  }

  getCollectionById(id: string): Observable<any> {
    const url = 'https://kvalifik-ccc4d-default-rtdb.europe-west1.firebasedatabase.app/collections/' + id + '.json';

    return timer(0, 600000)
      .pipe(
        switchMap(() => this.http.get<Collection>(url)),
        takeUntil(this.killSwitch)
      );
  }

  // not redux below
  deleteCollection(id: string): Observable<any> {
    // const url = 'https://kvalifik-ccc4d-default-rtdb.europe-west1.firebasedatabase.app/collections/' + coll.id + '.json';
    return this.http.delete(`${this.baseUrl}/${id}.json`)
      .pipe(
        catchError(this.handleError(`post url`, undefined))
      );
  }

  createCollection(coll: Collection): Observable<Collection | undefined> {
    return this.http.post<Collection>(`${this.baseUrl}.json`, coll)
      .pipe(
        catchError(this.handleError(`post ${this.baseUrl}.json`, undefined))
      );
  }

  updateCollection(id: string, coll: Collection): Observable<boolean | undefined> {
    return this.http.patch<boolean>(`${this.baseUrl}/${id}.json`, coll)
      .pipe(
        catchError(this.handleError(`post ${this.baseUrl}/${id}.json`, undefined)),
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
