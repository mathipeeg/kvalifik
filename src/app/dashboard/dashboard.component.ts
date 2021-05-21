import { Component, OnInit } from '@angular/core';
import {CollaborationService} from '../services/collaboration.service';
import {PostsService} from '../services/posts.service';
import {Collaboration, CollabPost, Post, User} from '../models';
import {UsersService} from '../services/users.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  posts = [] as Post[];
  collaborations = [] as Collaboration[];
  acceptedCollabs = [] as CollabPost[];
  invitedCollabs = [] as CollabPost[];
  currentUser = {} as User;

  constructor(private collaborationService: CollaborationService,
              private postsService: PostsService,
              private userService: UsersService) { }

  ngOnInit(): void {
    this.currentUser = this.userService.getUser;
    // my temp user ID = EFZGmRz
    this.collaborationService.readCollaborations().subscribe(collaborations => {
      const tempCollabs = collaborations;
      this.collaborations = collaborations;
      this.postsService.readPosts().subscribe(posts => {
        this.posts = posts;
        for (const postId in this.posts) {
          for (const collabId in tempCollabs) {
            if (tempCollabs[collabId].postId === postId || tempCollabs[collabId].postId === this.posts[postId].manualId) {
              // if (tempCollabs[collabId].userId === 'EFZGmRz'){ // todo: have it be this.currentUser.id
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
              // }
            }
          }
        }
      })
    })
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

}
