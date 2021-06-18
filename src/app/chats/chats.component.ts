import { Component, OnInit } from '@angular/core';
import {ChatsService} from '../services/chats.service';
import {Message, MessageUser, User} from '../models';
import {AuthService} from '../services/auth.service';
import {UsersService} from '../services/users.service';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss']
})
export class ChatsComponent implements OnInit {

  chats = [];
  messageUsers = [] as MessageUser[];
  idToken: string;
  user: User;

  constructor(private chatsService: ChatsService,
              private authService: AuthService,
              private userService: UsersService) { }

  ngOnInit(): void {
    this.idToken = sessionStorage.getItem('googleToken');
    if(this.idToken) {
      this.authService.getUserInfo(atob(JSON.parse(this.idToken))).subscribe(googleUser => {
        const localId = googleUser['users'][0].localId;
        this.userService.getUserByReferenceKey(localId).subscribe(user => {
          for (const id in user) {
            this.user = user[id];
            this.user.id = id;
          }

          this.chatsService.getAllChats().subscribe(chats => {
            let i = 0;
            for (const id in chats) {
              if (chats[id].convoId > i)  {
                i = chats[id].convoId;
              }
            }
            let count = 1;
            let tempArray = [];
            for (let j = 1; j <= i; j++) {
              console.log(j);
              for (const id in chats) {
                console.log(chats[id]);
                if (chats[id].convoId === j.toString()) {
                  // console.log('count' + count);
                  // console.log('j' + j );
                  if (count !== j) {
                    this.chats.push(tempArray);
                    count = j;
                    tempArray = [];
                  }
                  tempArray.push(chats[id]);
                  // console.log(chats[id]);
                }
              }
            }
            console.log(this.chats);
          })
        })
      })
    }
  }

}
