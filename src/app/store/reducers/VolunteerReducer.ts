import { tassign } from 'tassign';
import {CollectionState, VolunteerState} from '../Store';
import { PostActions } from '../actions/PostActions';
import {CollectionActions} from '../actions/CollectionActions';
import {VolunteerActions} from '../actions/VolunteerActions';

export const volunteers = [];

const INITIAL_STATE: VolunteerState = {volunteers};

export function volunteerReducer(state: VolunteerState = INITIAL_STATE, action) {
 switch (action.type) {
    case VolunteerActions.READ_VOLUNTEER:
        return tassign(state, {volunteers: action.payload});

    // case PostActions.UPDATE_POST:
    //     // [{i d:'1',...},{2},{3},{4},{5}]
    //     // [{1},{2},{3new},{4},{5}]
    //     // state.posts[2] = action.payload; // mutate the original array.
    //     const newArray = [...state.posts]; // copy of the array.
    //     const index = state.posts.findIndex(post => post.id === action.payload.id);
    //     newArray[index] = action.payload;
    //     return tassign(state, {posts: newArray});
    //
    //  case PostActions.DELETE_POST:
    //    console.log('test');
    //    const tempArray = [...state.posts]; // copy of the array.
    //    const i = state.posts.findIndex(post => post.id === action.payload.id);
    //    tempArray.splice(i, 1);
    //    console.log(tempArray);
    //    return tassign(state, {posts: tempArray});
    //
    //    // state.posts.splice(action.payload, 1);
    //    // return tassign([...state.posts]);
    //
    // case PostActions.ADD_POST:
    //     // add the action.payload (post) to the array of posts, but without mutating the array.
    //     // state.posts.push(action.payload);
    //     // return state;
    //
    //     return tassign(state, {posts: state.posts.concat(action.payload)});


   //      return tassign(state, {state.posts.splice(action.payload, 1)});
    default:
       return state;
}
}
