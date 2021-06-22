import {Component, OnInit} from '@angular/core';
import {CollaborationService} from '../services/collaboration.service';
import {PostsService} from '../services/posts.service';
import {Collaboration, CollabPost, Post, User} from '../models';
import {UsersService} from '../services/users.service';
import {AuthService} from '../services/auth.service';
import {DataSharingService} from '../app.component';
import {ActivatedRoute, Router} from '@angular/router';

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
              private dataSharingService: DataSharingService,
              private router: Router) { }

  ngOnInit(): void {
    this.sleepExample().then(() => {
      this.idToken = sessionStorage.getItem('googleToken');
      if(this.idToken.length > 1) {
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
                      // console.log(this.currentUser)
                      if (tempCollabs[collabId].userId === this.userId || tempCollabs[collabId].userId === 'EFZGmRz'){
                        // console.log(tempCollabs[collabId].title);
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
      else {
        // this.sleepExample();
        this.dataSharingService.isUserLoggedIn.subscribe( value => {
          if(value) {
            console.log('LOGGED IN BUT NOT REFRESHED');
            // console.log(this.idToken);
            // location.reload();
          }
        });
      }
    });
    // my temp user ID = EFZGmRz
  }

  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private async sleepExample() {
    await this.delay(1000);
  }


  accept(collabPost: CollabPost) {
    for (const coll in this.collaborations) {
      if (coll === collabPost.collabId) {
        this.collaborations[coll].accepted = true;
        this.collaborationService.updateCollaboration(coll, this.collaborations[coll]).subscribe();
        this.router.navigate(['/']);
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
      const length = eles.length;

      for (let i = 0; i < length; i++) { // todo: figure out wtf
        // console.log(eles[i]);
        // console.log(eles.item(i));
        eles[i].className = str;
        // console.log(i);
      }
    } else {
      const eles = document.getElementsByClassName('hiddenAccepted');
      const length = eles.length;

      for (let i = 0; i < length; i++) {
        eles[i].className = str;
      }
    }
  }

}
