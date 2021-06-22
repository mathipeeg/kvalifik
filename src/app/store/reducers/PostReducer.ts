import { tassign } from 'tassign';
import { PostState } from '../Store';
import { PostActions } from '../actions/PostActions';
import {Post} from '../../models';

const comments = [{id: '1', text: 'No'}, {id:'2', text: 'way'}];
export const posts = [];

export const INITIAL_STATE: PostState = {posts};

export function postsReducer(state: PostState = INITIAL_STATE, action) { // Tager state, action og returnerer ny state
 switch (action.type) {
    case PostActions.READ_POSTS:
        return tassign(state, {posts: action.payload});

    case PostActions.UPDATE_POST:
        const newArray = [...state.posts]; // copy of the array.
        const index = state.posts.findIndex(post => post.id === action.payload.id);
        newArray[index] = action.payload;
        return tassign(state, {posts: newArray});

     case PostActions.DELETE_POST:
       const tempArray = [...state.posts]; // copy of the array.
       const i = state.posts.findIndex(post => post.id === action.payload.id);
       tempArray.splice(i, 1);
       return tassign(state, {posts: tempArray});

    case PostActions.ADD_POST:
        return tassign(state, {posts: state.posts.concat(action.payload)});

    default:
       return state;
}
}
