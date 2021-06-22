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
    default:
       return state;
}
}
