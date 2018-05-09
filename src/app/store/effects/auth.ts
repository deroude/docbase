import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { of } from 'rxjs/observable/of';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import * as auth from '../actions/auth';

@Injectable()
export class AuthEffects {

    constructor(private actions$: Actions, private afAuth: AngularFireAuth) { }

    @Effect()
    signin$: Observable<Action> = this.actions$
        .ofType(auth.SIGNIN)
        .map((action: auth.SigninAction) => action.payload)
        .mergeMap(credentials =>
            fromPromise(this.afAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password))
                .map(u => new auth.SigninSuccessAction(u))
                .catch(err => of(new auth.SigninFailAction(err)))
        )

    @Effect()
    signout$: Observable<Action> = this.actions$
        .ofType(auth.SIGNOUT)
        .mergeMap(() =>
            fromPromise(this.afAuth.auth.signOut())
                .map(u => new auth.SignoutSuccessAction())
                .catch(err => of(new auth.SignoutFailAction(err)))
        )

    @Effect()
    signup$: Observable<Action> = this.actions$
        .ofType(auth.SIGNUP)
        .map((action: auth.SignupAction) => action.payload)
        .mergeMap(credentials =>
            fromPromise(this.afAuth.auth.createUserWithEmailAndPassword(credentials.email, credentials.password))
                .map(u => new auth.SignupSuccessAction(u))
                .catch(err => of(new auth.SignupFailAction(err)))
        )

}