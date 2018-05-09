import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { of } from 'rxjs/observable/of';

import { AngularFirestore } from 'angularfire2/firestore';

import * as tenant from "../actions/tenant";
import * as auth from "../actions/auth";

import { State } from '../reducers';
import { Tenant } from '../../domain/Tenant';

@Injectable()
export class TenantEffects {

    constructor(private actions$: Actions, private store$: Store<State>, private db: AngularFirestore) {
        db.firestore.settings({ timestampsInSnapshots: true });
    }

    @Effect()
    loadTenants$: Observable<Action> = this.actions$
        .ofType(auth.SIGNIN_SUCCESS)
        .map((action: auth.SigninSuccessAction) => action.payload)
        .mergeMap((u) => this.db.collection<Tenant>("/tenant")
            .snapshotChanges().map(actions => actions.map(a => {
                let t: Tenant = a.payload.doc.data() as Tenant;
                t.id = a.payload.doc.id;
                return t;
            }).filter((t: Tenant) => t.members.includes(u.uid)))
        )
        .map(tlist => new tenant.LoadSuccessAction(tlist))
        .catch(err => of(new tenant.LoadFailAction(err)));

    @Effect()
    unloadTenants$: Observable<Action> = this.actions$
        .ofType(auth.SIGNOUT_SUCCESS)
        .map(() => new tenant.ClearAction());

}
