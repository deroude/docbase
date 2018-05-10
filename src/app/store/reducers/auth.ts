import * as auth from "../actions/auth";
import * as firebase from 'firebase/app';

export interface State {
    user: firebase.User;
    error: string;
}

export const initialState: State = {
    user: null,
    error: null
}

export function reducer(state = initialState, action: auth.Actions): State {
    switch (action.type) {
        case auth.SIGNUP_FAIL:
            return { user: null, error: action.payload };
        case auth.SIGNUP_SUCCESS:
            return { user: action.payload, error: null };
        case auth.SIGNIN_FAIL:
            return { user: null, error: action.payload };
        case auth.SIGNIN_SUCCESS:
            return { user: action.payload, error: null };
        case auth.SIGNOUT:
        case auth.SIGNOUT_SUCCESS:
            return { user: null, error: null };
        case auth.SIGNOUT_FAIL:
            return Object.assign({}, state, { error: action.payload });
    }
    return state;
}