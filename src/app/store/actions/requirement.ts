import { Action } from '@ngrx/store';
import { Requirement } from '../../domain/requirement';

export const LOAD = "[Requirement] Load";
export const LOAD_SUCCESS = "[Requirement] Load successful";
export const LOAD_FAIL = "[Requirement] Load failed";
export const CLEAR = "[Requirement] Clear";
export const CREATE = "[Requirement] Create";
export const CREATE_SUCCESS = "[Requirement] Create successful";
export const CREATE_FAIL = "[Requirement] Create failed";
export const UPDATE = "[Requirement] Update";
export const UPDATE_SUCCESS = "[Requirement] Update successful";
export const UPDATE_FAIL = "[Requirement] Update failed";
export const DELETE = "[Requirement] Delete";
export const DELETE_SUCCESS = "[Requirement] Delete successful";
export const DELETE_FAIL = "[Requirement] Delete failed";

export interface ActionFail {
    subject: Requirement;
    error: string;
}

export class LoadAction implements Action {
    readonly type = LOAD;
    constructor() { };
}

export class LoadSuccessAction implements Action {
    readonly type = LOAD_SUCCESS;
    constructor(public payload: Requirement[]) { };
}

export class LoadFailAction implements Action {
    readonly type = LOAD_FAIL;
    constructor(public payload: string) { };
}

export class ClearAction implements Action {
    readonly type = CLEAR;
    constructor() { };
}

export class CreateAction implements Action {
    readonly type = CREATE;
    constructor(public payload: Requirement) { }
}

export class CreateSuccessAction implements Action {
    readonly type = CREATE_SUCCESS;
    constructor(public payload: Requirement) { }
}

export class CreateFailAction implements Action {
    readonly type = CREATE_FAIL;
    constructor(public payload: ActionFail) { }
}

export class UpdateAction implements Action {
    readonly type = UPDATE;
    constructor(public payload: Requirement) { }
}

export class UpdateSuccessAction implements Action {
    readonly type = UPDATE_SUCCESS;
    constructor(public payload: Requirement) { }
}

export class UpdateFailAction implements Action {
    readonly type = UPDATE_FAIL;
    constructor(public payload: ActionFail) { }
}

export class DeleteAction implements Action {
    readonly type = DELETE;
    constructor(public payload: Requirement) { }
}

export class DeleteSuccessAction implements Action {
    readonly type = DELETE_SUCCESS;
    constructor(public payload: Requirement) { }
}

export class DeleteFailAction implements Action {
    readonly type = DELETE_FAIL;
    constructor(public payload: ActionFail) { }
}

export type Actions = CreateAction
    | CreateFailAction
    | CreateSuccessAction
    | UpdateAction
    | UpdateFailAction
    | UpdateSuccessAction
    | DeleteAction
    | DeleteFailAction
    | DeleteSuccessAction
    | ClearAction
    | LoadAction
    | LoadSuccessAction
    | LoadFailAction;