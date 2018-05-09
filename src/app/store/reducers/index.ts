import { ActionReducerMap } from '@ngrx/store';

import * as fromAuth from './auth';
import * as fromTenant from './tenant';
import * as fromProject from './project';
import * as fromRequirement from './requirement';
import * as fromProgress from './progress';

export interface State {
    auth: fromAuth.State;
    tenant: fromTenant.State;
    project: fromProject.State;
    requirement: fromRequirement.State;
    progress: fromProgress.State;
}

export const reducers: ActionReducerMap<State> = {
    auth: fromAuth.reducer,
    tenant: fromTenant.reducer,
    project: fromProject.reducer,
    requirement: fromRequirement.reducer,
    progress: fromProgress.reducer
};
