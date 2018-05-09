import { Injectable } from "@angular/core";
import { Effect, Actions } from "@ngrx/effects";
import { Observable } from "rxjs/Observable";
import { Action } from "@ngrx/store";

import * as authActions from "../actions/auth";
import * as projectActions from "../actions/project";
import * as tenantActions from "../actions/tenant";
import * as requirementActions from "../actions/requirement";
import * as progressActions from "../actions/progress";


type showProgressTypes = authActions.SigninAction
    | authActions.SignupAction
    | authActions.SignoutAction
    | projectActions.LoadAction
    | tenantActions.LoadAction
    | requirementActions.CreateAction
    | requirementActions.DeleteAction
    | requirementActions.UpdateAction;

type hideProgressType = authActions.SigninSuccessAction
    | authActions.SignupSuccessAction
    | authActions.SignoutSuccessAction
    | projectActions.LoadSuccessAction
    | tenantActions.LoadSuccessAction
    | requirementActions.CreateSuccessAction
    | requirementActions.DeleteSuccessAction
    | requirementActions.UpdateSuccessAction
    | authActions.SignupFailAction
    | authActions.SignoutFailAction
    | projectActions.LoadFailAction
    | tenantActions.LoadFailAction
    | requirementActions.CreateFailAction
    | requirementActions.DeleteFailAction
    | requirementActions.UpdateFailAction;

const showProgressActions = [
    authActions.SIGNIN,
    authActions.SIGNOUT,
    authActions.SIGNUP,
    projectActions.LOAD,
    tenantActions.LOAD,
    requirementActions.CREATE,
    requirementActions.DELETE,
    requirementActions.UPDATE,
    requirementActions.LOAD
]

const hideProgressActions = [
    authActions.SIGNIN_FAIL,
    authActions.SIGNIN_SUCCESS,
    authActions.SIGNOUT_FAIL,
    authActions.SIGNOUT_SUCCESS,
    authActions.SIGNUP_FAIL,
    authActions.SIGNUP_SUCCESS,
    tenantActions.LOAD_FAIL,
    tenantActions.LOAD_SUCCESS,
    projectActions.LOAD_FAIL,
    projectActions.LOAD_SUCCESS,
    requirementActions.LOAD_FAIL,
    requirementActions.LOAD_SUCCESS,
    requirementActions.CREATE_FAIL,
    requirementActions.CREATE_SUCCESS,
    requirementActions.UPDATE_FAIL,
    requirementActions.UPDATE_SUCCESS,
    requirementActions.DELETE_FAIL,
    requirementActions.DELETE_SUCCESS
]

@Injectable()
export class ProgressEffects {

    constructor(private actions$: Actions) { }

    @Effect()
    showSpinner: Observable<Action> = this.actions$
        .ofType<showProgressTypes>(...showProgressActions)
        .map((action) => new progressActions.StartAction({ task: action.type }))

    @Effect()
    hideSpinner: Observable<Action> = this.actions$
        .ofType<hideProgressType>(...hideProgressActions)
        .map((action) => new progressActions.StopAction(action.type));
}