import { routerReducer } from '@angular-redux/router';
import {Action, combineReducers} from 'redux';
import { postsReducer } from './reducers/PostReducer';
import { usersReducer } from './reducers/UserReducer';
import {Post, User} from '../models';

export class PostState {
    posts: Post[];
}

export class UserState {
    loggedInUser: User;
    token: string;
}
// export class EventState {
//     events: Event[];
// }

export class AppState {
    posts?: PostState;
    users?: UserState;
    // events?: EventState;
}
export const rootReducer = combineReducers<AppState>({
    posts: postsReducer,
    users: usersReducer
    // events: eventsReducer,

    // router: routerReducer
});
