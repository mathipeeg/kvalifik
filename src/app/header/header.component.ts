import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {UsersService} from '../services/users.service';
import {User} from '../models';
import {DataSharingService} from '../app.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  idToken: string | undefined;
  user: User | undefined;
  isUserLoggedIn: boolean;
  title: string;
  headerTitle = ' ';

  constructor(private authService: AuthService,
              private userService: UsersService,
              private dataSharingService: DataSharingService,
              private router: Router) {
    this.dataSharingService.isUserLoggedIn.subscribe( value => {
      this.isUserLoggedIn = value;
    });
    this.dataSharingService.title.subscribe( value => {
      this.title = value;
    });
  }

  ngOnInit(): void {
    this.idToken = sessionStorage.getItem('googleToken');
    if (this.idToken.length > 1) {
      this.authService.getUserInfo(atob(JSON.parse(this.idToken))).subscribe(googleUser => {
        const localId = googleUser['users'][0].localId;
        this.userService.getUserByReferenceKey(localId).subscribe(user => {
          for (const id in user) {
            this.user = user[id];
            this.headerTitle = this.user.title;
          }
        });
      });
    }
  }

  signOut() {
    this.dataSharingService.isUserLoggedIn.next(false);
    this.dataSharingService.title.next('');
    sessionStorage.setItem('googleToken', '');
    this.router.navigate(['/']);
  }

  login() {
    this.router.navigate(['/login']);
  }

}
