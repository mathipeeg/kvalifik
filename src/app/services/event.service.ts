import { Injectable } from '@angular/core';
import {Observable, of, Subject, timer} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Collection, Event, EventSchedule} from '../models';
import {catchError, switchMap, takeUntil} from 'rxjs/operators';
import {ApiService} from './api.service';
import {NgRedux} from '@angular-redux/store';
import {AppState} from '../store/Store';

@Injectable({
  providedIn: 'root'
})
export class EventService extends ApiService {

  private killSwitch = new Subject();
  private baseUrl: string = 'https://kvalifik-ccc4d-default-rtdb.europe-west1.firebasedatabase.app/events';

  constructor(private httpClient: HttpClient, private ngRedux: NgRedux<AppState>) {
    super();
  }

  getEvents(): Observable<Event[]> {
    const url = this.baseUrl + '.json?';

    return timer(0, 600000)
      .pipe(
        switchMap(() => this.httpClient.get<Event[]>(url)),
        takeUntil(this.killSwitch)
      );
  }

  getEventById(id: string): Observable<any> {
    const url = this.baseUrl + '/' + id + '.json';

    return timer(0, 600000)
      .pipe(
        switchMap(() => this.httpClient.get<Event>(url)),
        takeUntil(this.killSwitch)
      );
  }

  updateEvent(event: Event): Observable<boolean | undefined> {
    return this.httpClient.patch<boolean>(`${this.baseUrl}/${event.manualId}.json`, event)
      .pipe(
        catchError(this.handleError(`post ${this.baseUrl}/${event.manualId}.json`, undefined)),
      );
  }

  addEvent(event: Event): Observable<Event | undefined> {
    return this.httpClient.post<Event>(`${this.baseUrl}.json`, event)
      .pipe(
        catchError(this.handleError(`post ${this.baseUrl}.json`, undefined))
      );
  }

  addSchedule(schedule: EventSchedule, eventId: string): Observable<Event | undefined> {
    return this.httpClient.post<Event>(`${this.baseUrl}/${eventId}/schedule.json`, schedule)
      .pipe(
        catchError(this.handleError(`post ${this.baseUrl}.json`, undefined))
      );
  }

  deleteSchedule(scheduleId: string, eventId: string): Observable<any> {
    // const url = 'https://kvalifik-ccc4d-default-rtdb.europe-west1.firebasedatabase.app/collections/' + coll.id + '.json';
    return this.httpClient.delete(`${this.baseUrl}/${eventId}/schedule/${scheduleId}.json`)
      .pipe(
        catchError(this.handleError(`post url`, undefined))
      );
  }

  deleteEvent(eventId: string): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/${eventId}.json`)
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
