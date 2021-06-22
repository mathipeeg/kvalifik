import {Post} from '../../src/app/models';
import {postsReducer, posts, INITIAL_STATE} from '../../src/app/store/reducers/PostReducer';
import * as types from '../../src/app/store/actions/PostActions';
import {PostActions} from '../../src/app/store/actions/PostActions';

declare var require: any;
const deepFreeze = require('deep-freeze');

  describe('posts reducer', () => {
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

    it('should return init state', () => {
      const newState = postsReducer(undefined, {});
      expect(newState).toEqual(INITIAL_STATE);
    });

    it('Add a new post to empty posts array', () => {
        const oldState = {posts: [] }
        deepFreeze(oldState); // fryser oldState - empty array

        const actionObj = {
          type: types.PostActions.ADD_POST,
          payload: newPost
        };
        const result = postsReducer(oldState, actionObj);

        expect(result.posts.length).toEqual(oldState.posts.length+1);
        expect(result.posts[result.posts.length-1]).toEqual(newPost);
    });

    it('Add a new post to non-empty posts array', () => {
        const oldState = {posts: [newPost, newPost]};
        deepFreeze(oldState);
        const actionObj = { type: types.PostActions.ADD_POST, payload: newPost };
        const result = postsReducer(oldState, actionObj);

        expect(result.posts.length).toEqual(oldState.posts.length + 1);
        expect(result.posts[result.posts.length-1]).toEqual(newPost);
    });

    it('Remove a post from an array of posts', () => {
      const oldState = {posts: [newPost, newPost]};
        deepFreeze(oldState);
        const actionObj = { type: types.PostActions.DELETE_POST, payload: newPost };
        const result = postsReducer(oldState, actionObj);
        expect(result.posts.length).toEqual(oldState.posts.length-1);
    });

    it('update a post in the posts array', () => {
      const oldState = {posts: [newPost]};

      deepFreeze(oldState);

      const updatedPost: Post = {
        collaboration: '',
        collections: [],
        comments: [],
        createdDate: undefined,
        likes: 3,
        pinned: false,
        responsible: [],
        state: '',
        id: 8888,
        title: 'updated Title',
        text: 'updated Text'
      };

      const actionObj = { type: types.PostActions.UPDATE_POST, payload: updatedPost };

      const result = postsReducer(oldState, actionObj);
      const post = result.posts.find(ele => ele.id === updatedPost.id);

      expect(post.text).toEqual('updated Text');
      expect(post.title).toEqual('updated Title');
      expect(post.likes).toEqual(3);
    });

});
