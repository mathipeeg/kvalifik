import { tassign } from 'tassign';
import { PostState } from '../Store';
import { PostActions } from '../actions/PostActions';
import {Post} from '../../models';

const comments = [{id: '1', text: 'No'}, {id:'2', text: 'way'}];
export const posts = [];

const INITIAL_STATE: PostState = {posts};

export function postsReducer(state: PostState = INITIAL_STATE, action) {
 switch (action.type) {
    case PostActions.READ_POSTS:
        return tassign(state, {posts: action.payload});

    case PostActions.UPDATE_POST:
        // [{i d:'1',...},{2},{3},{4},{5}]
        // [{1},{2},{3new},{4},{5}]
        // state.posts[2] = action.payload; // mutate the original array.
        const newArray = [...state.posts]; // copy of the array.
        const index = state.posts.findIndex(post => post.id === action.payload.id);
        newArray[index] = action.payload;
        return tassign(state, {posts: newArray});


    case PostActions.ADD_POST:
        // add the action.payload (post) to the array of posts, but without mutating the array.
        // state.posts.push(action.payload);
        // return state;

        // return tassign(state, {posts: state.posts.concat(action.payload)});
        return tassign(state, {posts: [...state.posts, action.payload]});

    // case PostActions.DELETE_POST:
    //     return tassign(state.posts.splice(action.payload, 1));

   default:
    return state;
}
}
