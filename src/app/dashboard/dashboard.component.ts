import { Component, OnInit } from '@angular/core';
import {CollaborationService} from '../collaboration.service';
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
      this.postsService.readPosts().subscribe(posts => {
        this.posts = posts;
        for (const postId in this.posts) {
          for (const collabId in tempCollabs) {
            if (tempCollabs[collabId].postId === postId) {
              if (tempCollabs[collabId].userId === 'EFZGmRz'){ // todo: have it be this.currentUser.id
                const newColl = {
                  title: tempCollabs[collabId].title,
                  accepted: tempCollabs[collabId].accepted,
                  postTitle: this.posts[postId].title,
                  postDescription: this.posts[postId].text,
                  postDate: this.posts[postId].createdDate,
                  postId,
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
  }

  accept(collabPost: CollabPost) {
    console.log(collabPost);
  }

  decline(collabPost: CollabPost) {
    console.log(collabPost);
  }

  remove(collabPost: CollabPost) {
    console.log(collabPost);
  }

}
