import { Action } from '@ngrx/store';

export const START = "[Progress] Start";
export const STOP = "[Progress] Stop";

export interface Progress {
    task: string;
    percent?: number;
}

export class StartAction implements Action {
    readonly type = START;
    constructor(public payload: Progress) { }
}

export class StopAction implements Action {
    readonly type = STOP;
    constructor(public payload: string) { }
}

export type Actions = StartAction | StopAction;