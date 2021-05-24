import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CollaborationService} from '../services/collaboration.service';
import {PostsService} from '../services/posts.service';
import {Collaboration, CollabPost, Post, User} from '../models';
import {UsersService} from '../services/users.service';
import {AuthService} from '../services/auth.service';
import {DataSharingService} from '../app.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  idToken: string;
  posts = [] as Post[];
  collaborations = [] as Collaboration[];
  acceptedCollabs = [] as CollabPost[];
  invitedCollabs = [] as CollabPost[];
  currentUser = {} as User;
  userId: string;

  constructor(private collaborationService: CollaborationService,
              private postsService: PostsService,
              private userService: UsersService,
              private authService: AuthService,
              private dataSharingService: DataSharingService) { }

  ngOnInit(): void {
    this.idToken = sessionStorage.getItem('googleToken');
    if(this.idToken) {
      this.authService.getUserInfo(atob(JSON.parse(this.idToken))).subscribe(googleUser => {
        const localId = googleUser['users'][0].localId;
        this.userService.getUserByReferenceKey(localId).subscribe(user => {
          for (const id in user) {
            this.currentUser = user[id];
            this.userId = id;
          }
          this.dataSharingService.title.next(this.currentUser.title);

          this.collaborationService.readCollaborations().subscribe(collaborations => {
            const tempCollabs = collaborations;
            this.collaborations = collaborations;
            this.postsService.readPosts().subscribe(posts => {
              this.posts = posts;
              for (const postId in this.posts) {
                for (const collabId in tempCollabs) {
                  if (tempCollabs[collabId].postId === postId || tempCollabs[collabId].postId === this.posts[postId].manualId) {
                    console.log(this.currentUser)
                    if (tempCollabs[collabId].userId === this.userId){
                      const newColl = {
                        title: tempCollabs[collabId].title,
                        accepted: tempCollabs[collabId].accepted,
                        postTitle: this.posts[postId].title,
                        postDescription: this.posts[postId].text,
                        postDate: this.posts[postId].createdDate,
                        postId,
                        collabId
                      }
                      if (tempCollabs[collabId].accepted) {
                        this.acceptedCollabs.push(newColl);
                      } else {
                        this.invitedCollabs.push(newColl);
                      }
                    }
                  }
                }
              }
            })
          })
        })
      });
    }
    // my temp user ID = EFZGmRz

  }

  accept(collabPost: CollabPost) {
    for (const coll in this.collaborations) {
      if (coll === collabPost.collabId) {
        this.collaborations[coll].accepted = true;
        this.collaborationService.updateCollaboration(coll, this.collaborations[coll]).subscribe();
      }
    }
  }

  remove(collabPost: CollabPost) {
    for (const coll in this.collaborations) {
      if (coll === collabPost.collabId) {
        this.collaborationService.deleteCollaboration(coll).subscribe();
      }
    }
  }

  showAll(str: string) {
    if (str === 'invitations') {
      const eles = document.getElementsByClassName('hiddenInvitations');
      for (let i = 0; i < eles.length; i++) {
        eles[i].className = str;
      }
    } else {
      const eles = document.getElementsByClassName('hiddenAccepted');
      for (let i = 0; i < eles.length; i++) {
        eles[i].className = str;
      }
    }
  }

}
