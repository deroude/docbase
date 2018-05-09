import * as project from "../actions/project";
import { Project } from "../../domain/project";

export interface State {
    projects: Project[];
    error: string;
    selected: string;
}

export const initialState: State = {
    projects: [],
    error: null,
    selected: null
}

export function reducer(state = initialState, action: project.Actions): State {
    switch (action.type) {
        case project.LOAD_SUCCESS:
            return Object.assign({}, state, { projects: action.payload, error: null });
        case project.LOAD_FAIL:
            return Object.assign({}, state, { project: null, error: action.payload });
        case project.SELECT:
            return Object.assign({}, state, { selected: action.payload });
        case project.CLEAR:
            return initialState;
    }
    return state;
}