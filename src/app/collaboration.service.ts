import { Injectable } from '@angular/core';
import {ApiService} from './services/api.service';
import {HttpClient} from '@angular/common/http';
import {NgRedux} from '@angular-redux/store';
import {AppState} from './store/Store';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CollaborationService extends ApiService {

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
}
