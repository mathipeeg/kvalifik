import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { AppState } from './../Store';

@Injectable({ providedIn: 'root'})
export class PostActions {

    constructor (private ngRedux: NgRedux<AppState>) 
    {} 

  static SET_HAPPY: string = 'SET_HAPPY'; 

  setType(isHappy: boolean): void {
    
    this.ngRedux.dispatch({
        type: PostActions.SET_HAPPY,
        payload: isHappy
    });
  }

}
