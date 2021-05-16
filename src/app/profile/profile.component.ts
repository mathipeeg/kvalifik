import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../auth.service';
import { Location } from '@angular/common'
import {UsersService} from '../users.service';
import {User} from '../models';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: User;
  title = 'Create your profile'

  constructor(private route: ActivatedRoute,
              private userService: UsersService,
              private location: Location) { }

  ngOnInit(): void {
    this.user = this.userService.getUser;
    console.log(this.user);
  }

  back(): void {
    this.location.back();
  }

}
