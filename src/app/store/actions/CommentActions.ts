import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { AppState } from '../Store';
import { PostsService } from 'src/app/services/posts.service';
import {Collection, Comment} from '../../models';
import {CollectionService} from '../../services/collection.service';
import {CommentsService} from '../../services/comments.service';

@Injectable({ providedIn: 'root'})
export class CommentActions {

  constructor(private ngRedux: NgRedux<AppState>, private commentsService: CommentsService)
  {}

  static DELETE_COMMENT: string = 'DELETE_COMMENT';
  static ADD_COMMENT: string = 'ADD_COMMENT';
  static UPDATE_COMMENT: string = 'UPDATE_COMMENT';
  static READ_COMMENT: string = 'READ_COMMENT';

  readComments(): void {
    this.commentsService.readComments().subscribe((result: any) => {

      const comments: Comment[] = [];
      for (const id in result) {
        let commentObj = {} as Comment;
        commentObj = result[id];
        commentObj.id = id;
        comments.push(commentObj as Comment);
      }
      console.log(comments);

      this.ngRedux.dispatch({
        type: CommentActions.READ_COMMENT,
        payload: comments
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
