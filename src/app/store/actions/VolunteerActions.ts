import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { AppState } from '../Store';
import { PostsService } from 'src/app/services/posts.service';
import {Collection, Post, Volunteer} from '../../models';
import {CollectionService} from '../../services/collection.service';
import {VolunteerService} from '../../services/volunteer.service';

@Injectable({ providedIn: 'root'})
export class VolunteerActions {

  constructor(private ngRedux: NgRedux<AppState>,
              private collectionService: CollectionService,
              private volunteerService: VolunteerService)
  {}

  static DELETE_VOLUNTEER: string = 'DELETE_VOLUNTEER';
  static ADD_VOLUNTEER: string = 'ADD_VOLUNTEER';
  static UPDATE_VOLUNTEER: string = 'UPDATE_VOLUNTEER';
  static READ_VOLUNTEER: string = 'READ_VOLUNTEER';

  readVolunteers(): void {
    this.volunteerService.readVolunteers().subscribe((result: any) => {

      const volunteers: Volunteer[] = [];
      for (const id in result) {
        let volunteerObj = {} as Volunteer;
        volunteerObj = result[id];
        volunteerObj.id = id;
        volunteers.push(volunteerObj as Volunteer);
      }
      console.log(volunteers);

      this.ngRedux.dispatch({
        type: VolunteerActions.READ_VOLUNTEER,
        payload: volunteers
      });
    });
  }

  // addPost(newPost: Post): void {
  //   console.log(newPost);
  //
  //   this.postService.savePost(newPost).subscribe((result: any) => {
  //     // console.log("result from saving");
  //     // console.log(result);
  //
  //     newPost.id = result.name;
  //
  //     this.ngRedux.dispatch({
  //       type: PostActions.ADD_POST,
  //       payload: newPost
  //     });
  //   });
  // }
  //
  // updatePost(updatedPost: Post) : void {
  //   this.ngRedux.dispatch({
  //       type: PostActions.UPDATE_POST,
  //       payload: updatedPost
  //   });
  //   this.postService.updatePost(updatedPost).subscribe(post => {
  //     console.log(post);
  //   })
  // }
  //
  // deletePost(post: Post) {
  //   this.ngRedux.dispatch({
  //     type: PostActions.DELETE_POST,
  //     payload: post
  //   });
  //
  //   this.postService.deletePost(post).subscribe(res => {
  //     console.log('Post deleted');
  //   });
  // }

}
