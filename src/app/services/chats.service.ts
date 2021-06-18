import { Injectable } from '@angular/core';
import {Observable, ObservedValueOf, of, Subject, timer} from 'rxjs';
import {catchError, switchMap, takeUntil} from 'rxjs/operators';
import {Message} from '../models';
import {HttpClient} from '@angular/common/http';
import {ApiService} from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ChatsService extends ApiService {
  private killSwitch = new Subject();
  baseUrl = 'https://kvalifik-ccc4d-default-rtdb.europe-west1.firebasedatabase.app/chats';

  constructor(private httpClient: HttpClient) {
    super();
  }

  getAllChats() {
    const url = this.baseUrl + '.json';
    return this.httpClient.get(url, this.getHttpOptions()).pipe(catchError(this.handleError(`post ${url}`, undefined)));
  }
  //
  // getChatsToUser(currentId: string): Observable<Message> {
  //   const url = this.baseUrl + '.json?orderBy="users"&equalTo="' + currentId + '"';
  //   return this.httpClient.get(url, this.getHttpOptions()).pipe(catchError(this.handleError(`post ${url}`, undefined)));
  // }
  //
  // // getChatsToUser(currentId: string): Observable<Message[]> {
  // //   const url = this.baseUrl + '.json?orderBy="to"&equalTo="' + currentId + '"';
  // //   return this.httpClient.get(url, this.getHttpOptions()).pipe(catchError(this.handleError(`post ${url}`, undefined)));
  // // }
  //
  // getChatsFromUser(currentId: string): Observable<Message[]> {
  //   const url = this.baseUrl + '.json?orderBy="from"&equalTo="' + currentId + '"';
  //   return this.httpClient.get(url, this.getHttpOptions()).pipe(catchError(this.handleError(`post ${url}`, undefined)));
  // }

  private handleError<T>(operation = 'operation', result?: T): any {
    return (error: any): Observable<T> => {
      console.error(error);
      console.error(operation + ' - ' + JSON.stringify(error));
      return of(result as T);
    };
  }
}
