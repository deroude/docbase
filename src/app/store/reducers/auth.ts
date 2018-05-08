import * as auth from "../actions/auth";
import * as firebase from 'firebase/app';

export interface State {
    user: firebase.User;
}

export const initialState: State = {
    user: null
}

export function reducer(state = initialState, action: auth.Actions) {
    switch(action.type){
        case auth.SIGNUP:
            
    }
}