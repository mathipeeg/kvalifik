import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { AppState } from '../Store';
import { PostsService } from 'src/app/services/posts.service';
import {Collection, Post} from '../../models';
import {CollectionService} from '../../services/collection.service';

@Injectable({ providedIn: 'root'})
export class CollectionActions {

  constructor(private ngRedux: NgRedux<AppState>, private collectionService: CollectionService)
  {}

  static DELETE_COLL: string = 'DELETE_COLL';
  static ADD_COLL: string = 'ADD_COLL';
  static UPDATE_COLL: string = 'UPDATE_COLL';
  static READ_COLL: string = 'READ_COLL';

  readCollections(): void {
    this.collectionService.readCollections().subscribe((result: any) => {

      const collections: Collection[] = [];
      for (const id in result) {
        let collObj = {} as Collection;
        collObj = result[id];
        collObj.id = id;
        collections.push(collObj as Collection);
      }
      // console.log(collections);

      this.ngRedux.dispatch({
        type: CollectionActions.READ_COLL,
        payload: collections
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
