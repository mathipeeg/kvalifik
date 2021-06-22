import { tassign } from 'tassign';
import {CollectionState, CommentState} from '../Store';
import { PostActions } from '../actions/PostActions';
import {CommentActions} from '../actions/CommentActions';

export const comments = [];

export const INITIAL_STATE: CommentState = {comments};

export function commentReducer(state: CommentState = INITIAL_STATE, action) {
 switch (action.type) {
    case CommentActions.READ_COMMENT:
        return tassign(state, {comments: action.payload});

    case CommentActions.UPDATE_COMMENT:
        const newArray = [...state.comments]; // copy of the array.
        const index = state.comments.findIndex(comment => comment.id === action.payload.id);
        newArray[index] = action.payload;
        return tassign(state, {comments: newArray});

     case CommentActions.DELETE_COMMENT:
       const tempArray = [...state.comments]; // copy of the array.
       const i = state.comments.findIndex(comment => comment.id === action.payload.id);
       tempArray.splice(i, 1);
       return tassign(state, {comments: tempArray});

    case CommentActions.ADD_COMMENT:
        return tassign(state, {comments: state.comments.concat(action.payload)});

    default:
       return state;
}
}
