import { routerReducer } from '@angular-redux/router';
import {Action, AnyAction, combineReducers} from 'redux';
import { postsReducer } from './reducers/PostReducer';
import { usersReducer } from './reducers/UserReducer';
import { collectionReducer } from './reducers/CollectionReducer';
import { commentReducer } from './reducers/CommentReducer';
import {volunteerReducer} from './reducers/VolunteerReducer';
import {Collection, Post, User, Comment, Volunteer, Collaboration} from '../models';
import {collaborationReducer} from './reducers/CollaborationReducer';

export class PostState {
    posts: Post[];
}

export class CollectionState {
    collections: Collection[];
}

export class CommentState {
    comments: Comment[];
}

export class VolunteerState {
    volunteers: Volunteer[];
}

export class CollaborationState {
    collabs: Collaboration[];
}

export class UserState {
    loggedInUser: User;
    token: string;
}

export class AppState {
    posts?: PostState;
    users?: UserState;
    collections?: CollectionState;
    comments?: CommentState;
    volunteers?: VolunteerState;
    collabs?: CollaborationState;
}

// Store indeholder hele applikationens state. Listeners får besked om ændringer gennem Store
export const rootReducer = combineReducers<AppState>({
    users: usersReducer,
    posts: postsReducer,
    collections: collectionReducer,
    comments: commentReducer,
    volunteers: volunteerReducer,
    collabs: collaborationReducer
});
