import { tassign } from 'tassign';
import { PostState } from '../Store';
import { PostActions } from '../actions/PostActions';
import { Post } from 'src/app/entities/Post';

const INITIAL_STATE: PostState = {isHappy: true, posts: [
    {id: '1', createdDate: new Date(2021, 0, 2), title: 'Is there life out there', text: 'Something' } as Post,
    {id: '2', createdDate: new Date(2021, 1, 2), title: 'Do androids dream of electric sheep?', text: 'Something' } as Post,
    {id: '3', createdDate: new Date(2021, 2, 2), title: 'What other good questions are there?', text: 'Something' } as Post,
    {id: '4', createdDate: new Date(2021, 3, 2), title: 'How many stars are there in the visible universe?', text: 'Something' } as Post,
    {id: '5', createdDate: new Date(2021, 4, 2), title: 'What lies beyond the visible universe?', text: 'Something' } as Post
]};

export function postsReducer(state: PostState = INITIAL_STATE, action: any) {
 switch (action.type) {
  case PostActions.SET_HAPPY:
    // action.payload = true/false
    // state.isHappy = action.payload; // mutating the old state object.
    // return Object.assign({}, state, {isHappys: action.payload});
    return tassign(state, { isHappy: action.payload });

   default:
    return state;
}
}
