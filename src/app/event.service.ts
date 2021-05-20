import { Injectable } from '@angular/core';
import {Observable, Subject, timer} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Event} from './models';
import {switchMap, takeUntil} from 'rxjs/operators';
import {ApiService} from './services/api.service';
import {NgRedux} from '@angular-redux/store';
import {AppState} from './store/Store';

@Injectable({
  providedIn: 'root'
})
export class EventService extends ApiService {

  private killSwitch = new Subject();

  constructor(private httpClient: HttpClient, private ngRedux: NgRedux<AppState>) {
    super();
  }

  getEvents(): Observable<Event[]> {
    const url = 'https://kvalifik-ccc4d-default-rtdb.europe-west1.firebasedatabase.app/events.json?';

    // return this.httpClient.get(url, this.getHttpOptions());

    return timer(0, 600000)
      .pipe(
        switchMap(() => this.httpClient.get<Event[]>(url)),
        takeUntil(this.killSwitch)
      );
  }
}
