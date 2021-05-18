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
      // console.log(comments);

      this.ngRedux.dispatch({
        type: CommentActions.READ_COMMENT,
        payload: comments
      });
    });
  }

  addComment(newComment: Comment): void {
    this.commentsService.saveComment(newComment).subscribe((result: any) => {

      newComment.id = result.name;

      this.ngRedux.dispatch({
        type: CommentActions.ADD_COMMENT,
        payload: newComment
      });
    });
  }

  updateComment(updatedComment: Comment) : void {
    this.ngRedux.dispatch({
        type: CommentActions.UPDATE_COMMENT,
        payload: updatedComment
    });
    this.commentsService.updateComment(updatedComment).subscribe(comment => {
      console.log('Updated');
    })
  }

  deleteComment(comment: Comment) {
    this.ngRedux.dispatch({
      type: CommentActions.DELETE_COMMENT,
      payload: comment
    });

    this.commentsService.deleteComment(comment).subscribe(res => {
      console.log('Comment deleted');
    });
  }

}
