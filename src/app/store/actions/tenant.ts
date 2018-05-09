import { Action } from '@ngrx/store';
import { Tenant } from '../../domain/Tenant';

export const SELECT = "[Tenant] Select";
export const LOAD = "[Tenant] Load";
export const LOAD_SUCCESS = "[Tenant] Load successful";
export const LOAD_FAIL = "[Tenant] Load failed"
export const CLEAR = "[Tenant] Clear"

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
    constructor(public payload: Tenant[]) { }
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