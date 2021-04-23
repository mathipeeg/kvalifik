import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { AppState } from './../Store';
import { Post } from 'src/app/entities/Post';
import { PostsService } from 'src/app/posts.service';

@Injectable({ providedIn: 'root'})
export class PostActions {

    constructor (private ngRedux: NgRedux<AppState>, private postService: PostsService)
    {}

  static SET_HAPPY: string = 'SET_HAPPY';
  static ADD_POST: string = 'ADD_POST';
  static UPDATE_POST: string = 'UPDATE_POST';
  static READ_POSTS: string = 'READ_POSTS';


  readPosts() {
    this.postService.readPosts().subscribe((result: any) => {
      console.log("result from server");
      console.log(result);

      let posts: Post[] = [];
      for(let id in result) {
        let postObj = result[id];
        postObj.id = id;
        
        posts.push(postObj as Post);
      }

      this.ngRedux.dispatch({
        type: PostActions.READ_POSTS,
        payload: posts
      });
    });
  }


  setType(isHappy: boolean): void {

    this.ngRedux.dispatch({
        type: PostActions.SET_HAPPY,
        payload: isHappy
    });
  }

  addPost(newPost: Post) : void {

    this.postService.savePost(newPost).subscribe((result: any) => {
      console.log("result from saving");
      console.log(result);

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
  }

}
