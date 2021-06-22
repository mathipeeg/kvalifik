import { tassign } from 'tassign';
import {CollectionState} from '../Store';
import { PostActions } from '../actions/PostActions';
import {CollectionActions} from '../actions/CollectionActions';

export const collections = [];

const INITIAL_STATE: CollectionState = {collections};

export function collectionReducer(state: CollectionState = INITIAL_STATE, action) {
 switch (action.type) {
    case CollectionActions.READ_COLL:
        return tassign(state, {collections: action.payload});

    default:
       return state;
}
}
