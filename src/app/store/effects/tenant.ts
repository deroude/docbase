import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/takeUntil';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { of } from 'rxjs/observable/of';

import * as firebase from 'firebase/app';

import * as tenant from "../actions/tenant";
import * as project from "../actions/project";
import * as auth from "../actions/auth";

import { State } from '../reducers';
import { Tenant } from '../../domain/Tenant';
import { FirestoreService } from '../../services/firestore.service';

@Injectable()
export class TenantEffects {

    private auth$: Observable<firebase.User> = this.store$.select(state => state.auth.user);

    constructor(private actions$: Actions, private store$: Store<State>, private db: FirestoreService) { }

    @Effect()
    loadTenants$: Observable<Action> = this.actions$
        .ofType(tenant.LOAD)
        .withLatestFrom(this.auth$)
        .filter(([a, u]) => u !== null)
        .switchMap(([a, u]) => this.db.getCollection<Tenant>("/tenant")
            .takeUntil(this.auth$.filter(u => u === null))
            .map(coll => coll.filter((t: Tenant) => t.members.includes(u.uid)))
        )
        .map(tlist => new tenant.LoadSuccessAction(tlist))
        .catch(err => of(new tenant.LoadFailAction(err)));

    @Effect()
    unloadTenants$: Observable<Action> = this.actions$
        .ofType(auth.SIGNOUT)
        .map(() => new tenant.ClearAction());

    @Effect()
    selectTenants$: Observable<Action> = this.actions$
        .ofType(tenant.SELECT)
        .map(() => new project.LoadAction());

    @Effect()
    afterLogin$: Observable<Action> = this.actions$
        .ofType(auth.SIGNIN_SUCCESS)
        .map(() => new tenant.LoadAction());
}
