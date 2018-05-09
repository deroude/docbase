import * as requirement from "../actions/requirement";
import { Requirement } from "../../domain/requirement";

export interface State {
    requirements: Requirement[];
    error: string;
}

export const initialState: State = {
    requirements: [],
    error: null
}

export function reducer(state = initialState, action: requirement.Actions): State {
    switch (action.type) {
        case requirement.DELETE_FAIL:
        case requirement.UPDATE_FAIL:
        case requirement.CREATE_FAIL:
            return Object.assign({}, state, {
                error: (action.payload as requirement.ActionFail).error
            });
        case requirement.UPDATE_SUCCESS:
        case requirement.DELETE_SUCCESS:
        case requirement.CREATE_SUCCESS:
            return Object.assign({}, state, {
                error: null
            });
        case requirement.LOAD_SUCCESS:
            return { requirements: action.payload, error: null }
        case requirement.LOAD_FAIL:
            return { requirements: [], error: action.payload }
        case requirement.CLEAR:
            return initialState;
    }
    return state;
}