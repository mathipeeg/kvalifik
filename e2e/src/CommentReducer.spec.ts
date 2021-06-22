import {Comment} from '../../src/app/models';
import {commentReducer, INITIAL_STATE} from '../../src/app/store/reducers/CommentReducer';
import * as types from '../../src/app/store/actions/CommentActions';
declare var require: any;
const deepFreeze = require('deep-freeze');

  describe('comments reducer', () => {
    const newComment: Comment = {
      id: -1,
      manualId: 'test',
      authorId: 'test author',
      createdDate: new Date(),
      text: 'comment text',
      likes: 0
    };

    it('should return init state', () => {
      const newState = commentReducer(undefined, {});
      expect(newState).toEqual(INITIAL_STATE);
    });

    it('Add a new comment to comments array', () => {
      const oldState = {comments: [newComment, newComment] }
      deepFreeze(oldState); // fryser oldState - empty array

      const actionObj = {
        type: types.CommentActions.ADD_COMMENT,
        payload: newComment
      };
      const result = commentReducer(oldState, actionObj);

      expect(result.comments.length).toEqual(oldState.comments.length+1);
      expect(result.comments[result.comments.length-1]).toEqual(newComment);
    });


    it('Remove a comment from an array of comment', () => {
      const oldState = {comments: [newComment, newComment]};
      deepFreeze(oldState);
      const actionObj = { type: types.CommentActions.DELETE_COMMENT, payload: newComment};
      const result = commentReducer(oldState, actionObj);
      expect(result.comments.length).toEqual(oldState.comments.length-1);
    });

    it('update a comment in the comments array', () => {
      const oldState = {comments: [newComment, newComment]};
      deepFreeze(oldState);

      const updatedComment: Comment = {
        id: -1,
        manualId: 'test',
        authorId: 'test author',
        createdDate: new Date(),
        text: 'UPDATED',
        likes: 20
      };

      const actionObj = { type: types.CommentActions.UPDATE_COMMENT, payload: updatedComment };

      const result = commentReducer(oldState, actionObj);
      const post = result.comments.find(ele => ele.id === updatedComment.id);

      expect(post.text).toEqual('UPDATED');
      expect(post.likes).toEqual(20);
    });

});
