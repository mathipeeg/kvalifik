import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { AppState } from '../Store';
import { PostsService } from 'src/app/services/posts.service';
import {Post} from '../../models';

@Injectable({ providedIn: 'root'})
export class PostActions {

  constructor(private ngRedux: NgRedux<AppState>, private postService: PostsService)
  {}

  static DELETE_POST: string = 'DELETE_POST';
  static ADD_POST: string = 'ADD_POST';
  static UPDATE_POST: string = 'UPDATE_POST';
  static READ_POSTS: string = 'READ_POSTS';

  readPosts(): void {
    this.postService.readPosts().subscribe((result: any) => {

      const posts: Post[] = [];
      for (const id in result) {
        let postObj = {} as Post;
        postObj = result[id];
        postObj.id = id;
        posts.push(postObj as Post);
      }

      this.ngRedux.dispatch({
        type: PostActions.READ_POSTS,
        payload: posts
      });
    });
  }

  addPost(newPost: Post): void {
    console.log(newPost);

    this.postService.savePost(newPost).subscribe((result: any) => {
      // console.log("result from saving");
      // console.log(result);

      newPost.id = result.name;

      this.ngRedux.dispatch({
        type: PostActions.ADD_POST,
        payload: newPost
      });
    });
  }

  updatePost(updatedPost: Post) : void {
    this.ngRedux.dispatch({
        type: PostActions.UPDATE_POST,
        payload: updatedPost
    });
    this.postService.updatePost(updatedPost).subscribe(post => {
      console.log(post);
    })
  }

  deletePost(post: Post) {
    this.ngRedux.dispatch({
      type: PostActions.DELETE_POST,
      payload: post
    });

    this.postService.deletePost(post).subscribe(res => {
      console.log('Post deleted');
    });
  }

}
