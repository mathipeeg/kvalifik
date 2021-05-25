import { Component } from '@angular/core';
import {AuthService} from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'kvalifik';
  isUserLoggedIn: boolean;

  constructor(private authService: AuthService,
              private dataSharingService: DataSharingService) {
    this.dataSharingService.isUserLoggedIn.subscribe( value => {
      this.isUserLoggedIn = value;
    });

    if (sessionStorage.getItem('googleToken')) {
      this.dataSharingService.isUserLoggedIn.next(true);
    }
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataSharingService {
  public isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public title: BehaviorSubject<string> = new BehaviorSubject<string>('');
}
