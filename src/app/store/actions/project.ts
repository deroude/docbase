import { Action } from '@ngrx/store';
import { Project } from '../../domain/project';

export const SELECT = "[Project] Select";
export const LOAD = "[Project] Load";
export const LOAD_SUCCESS = "[Project] Load successful";
export const LOAD_FAIL = "[Project] Load failed";
export const CLEAR = "[Project] Clear";

export class SelectAction implements Action {
    readonly type = SELECT;
    constructor(public payload: string) { }
}

export class LoadAction implements Action {
    readonly type = LOAD;
    constructor() { }
}

export class ClearAction implements Action {
    readonly type = CLEAR;
    constructor() { }
}

export class LoadSuccessAction implements Action {
    readonly type = LOAD_SUCCESS;
    constructor(public payload: Project[]) { }
}

export class LoadFailAction implements Action {
    readonly type = LOAD_FAIL;
    constructor(public payload: string) { }
}

export type Actions = SelectAction
    | LoadSuccessAction
    | LoadFailAction
    | ClearAction
    | LoadAction;