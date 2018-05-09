import * as tenant from "../actions/tenant";
import { Tenant } from "../../domain/Tenant";

export interface State {
    tenants: Tenant[];
    error: string;
    selected: string;
}

export const initialState: State = {
    tenants: [],
    error: null,
    selected: null
}

export function reducer(state = initialState, action: tenant.Actions): State {
    switch (action.type) {
        case tenant.LOAD_SUCCESS:
            return Object.assign({}, state, { tenants: action.payload, error: null });
        case tenant.LOAD_FAIL:
            return Object.assign({}, state, { tenants: null, error: action.payload });
        case tenant.SELECT:
            return Object.assign({}, state, { selected: action.payload });
        case tenant.CLEAR:
            return initialState;
    }
    return state;
}