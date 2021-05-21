import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { AppState } from '../Store';
import { PostsService } from 'src/app/services/posts.service';
import {Collaboration, Collection, Comment} from '../../models';
import {CollectionService} from '../../services/collection.service';
import {CommentsService} from '../../services/comments.service';
import {CollaborationService} from '../../services/collaboration.service';

@Injectable({ providedIn: 'root'})
export class CollaborationActions {

  constructor(private ngRedux: NgRedux<AppState>, private collaborationService: CollaborationService)
  {}

  static DELETE_COLLAB: string = 'DELETE_COLLAB';
  static ADD_COLLAB: string = 'ADD_COLLAB';
  static UPDATE_COLLAB: string = 'UPDATE_COLLAB';
  static READ_COLLAB: string = 'READ_COLLAB';

  readCollabs(): void {
    this.collaborationService.readCollaborations().subscribe((result: any) => {

      const collabs: Collaboration[] = [];
      for (const id in result) {
        let collabObj = {} as Collaboration;
        collabObj = result[id];
        collabObj.id = id;
        collabs.push(collabObj as Collaboration);
      }
      console.log(collabs);

      this.ngRedux.dispatch({
        type: CollaborationActions.READ_COLLAB,
        payload: collabs
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
