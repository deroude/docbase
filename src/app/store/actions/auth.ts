import { Action } from '@ngrx/store';
import * as firebase from 'firebase/app';

export const SIGNIN = '[Auth] Login';
export const SIGNIN_SUCCESS = '[Auth] Login Successful';
export const SIGNIN_FAIL = '[Auth] Login Failed';
export const SIGNUP = '[Auth] Signup';
export const SIGNUP_SUCCESS = '[Auth] Signup Successful';
export const SIGNUP_FAIL = '[Auth] Signup Failed';
export const SIGNOUT = '[Auth] Signout';

export interface Credentials {
    email: string;
    password: string;
}

export class SigninAction implements Action {
    readonly type = SIGNIN;
    constructor(public payload: Credentials) { }
}

export class SigninSuccessAction implements Action {
    readonly type = SIGNIN_SUCCESS;
    constructor(public payload: firebase.User) { }
}

export class SigninFailAction implements Action {
    readonly type = SIGNIN_FAIL;
    constructor(public payload: string) { }
}

export class SignupAction implements Action {
    readonly type = SIGNUP;
    constructor(public payload: Credentials) { }
}

export class SignupSuccessAction implements Action {
    readonly type = SIGNUP_SUCCESS;
    constructor(public payload: firebase.User) { }
}

export class SignupFailAction implements Action {
    readonly type = SIGNUP_FAIL;
    constructor(public payload: string) { }
}

export class SignoutAction implements Action {
    readonly type = SIGNOUT;
    constructor(public payload: Credentials) { }
}

export type Actions = SigninAction
    | SigninFailAction
    | SigninSuccessAction
    | SignoutAction
    | SignupAction
    | SignupFailAction
    | SignupSuccessAction;