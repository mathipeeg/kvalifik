import {Post} from '../../models';

declare var require: any;
const deepFreeze = require('deep-freeze');
import { postsReducer, posts } from '../reducers/PostReducer';
import * as types from '../actions/PostActions';

  describe('posts reducer', () => {

    it('Add a new post to empty posts array', () => {
        const oldState = {posts: [] }
        const newPost: Post = {
          collaboration: '',
          responsible: [],
          likes: 0,
          pinned: false,
          state: '',
          id: 8888,
          createdDate: new Date(),
          title: 'test title',
          text: 'test text',
          media: 'empty media',
          collections: [],
          comments: []
        };
        deepFreeze(oldState);

        const actionObj = { type: types.PostActions.ADD_POST, payload: newPost };

         // Act
        const result = postsReducer(oldState, actionObj);

        // Assert (expect)
        // expect(result.posts).toHaveSize(oldState.posts.length+1);
        expect(result.posts[result.posts.length-1]).toEqual(newPost);
    });

    // it('Add a new post to non-empty posts array', () => {
    //     // Arrange, Act, Assert
    //
    //     // Arrange
    //     const oldState = {posts };
    //     const newPost: Post = {
    //       collaboration: '', responsible: [],
    //       likes: 0,
    //       pinned: false,
    //       state: '',
    //       id: 8888,
    //       createdDate: new Date(),
    //       title: 'test title',
    //       text: 'test text',
    //       media: 'empty media',
    //       collections: [],
    //       comments: []
    //     };
    //     deepFreeze(oldState);
    //
    //     const actionObj = { type: types.PostActions.ADD_POST, payload: newPost };
    //
    //      // Act
    //     const result = postsReducer(oldState, actionObj);
    //
    //     // Assert (expect)
    //     expect(result.posts).toHaveSize(oldState.posts.length+1);
    //     expect(result.posts[result.posts.length-1]).toEqual(newPost);
    //     // console.log(result.posts);
    // });
    //
    // it('Delete a post frm an array of posts', () => {
    //     // Arrange, Act, Assert
    //     const oldState = {posts }
    //     // Arrange
    //     const post: Post = {
    //       collaboration: '', collections: [], comments: [], createdDate: undefined, likes: 0, pinned: false, responsible: [], state: '',
    //       id: 8888,
    //       title: 'test title',
    //       text: 'test text'
    //     };
    //     deepFreeze(oldState);
    //
    //     const actionObj = { type: types.PostActions.DELETE_POST, payload: post };
    //
    //      // Act
    //     const result = postsReducer(oldState, actionObj);
    //
    //     // Assert (expect)
    //     expect(result.posts).toHaveSize(oldState.posts.length-1);
    //     // expect(result.posts[result.posts.length-1]).toEqual(newPost);
    //     // console.log(result.posts);
    // });
    //
    // it('update a post in the posts array', () => {
    //     const oldState = {posts }
    //     const updatedPost: Post = {
    //         id: '3',
    //         createdDate: new Date(2021, 2, 2),
    //         title: 'What other good questions are there?',
    //         text: 'abc'
    //     } as Post;
    //
    //     deepFreeze(oldState);
    //
    //     const actionObj = { type: types.PostActions.UPDATE_POST, payload: updatedPost };
    //
    //      // Act
    //     const result = postsReducer(oldState, actionObj);
    //     const post = result.posts.find(ele => ele.id === updatedPost.id);
    //
    //     // Assert (expect)
    //     expect(post.text).toEqual('abc');
    // });

});
