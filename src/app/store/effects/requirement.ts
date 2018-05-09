import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/withLatestFrom';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { of } from 'rxjs/observable/of';

import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';

import * as tenant from "../actions/tenant";
import * as project from "../actions/project";
import * as requirement from "../actions/requirement";
import * as auth from "../actions/auth";

import { State } from '../reducers';
import { Tenant } from '../../domain/tenant';
import { Project } from '../../domain/project';
import { Requirement } from '../../domain/requirement';

@Injectable()
export class RequirementEffects {

    private auth$: Observable<firebase.User> = this.store$.select(state => state.auth.user);
    private tenant$: Observable<string> = this.store$.select(state => state.tenant.selected);
    private project$: Observable<string> = this.store$.select(state => state.project.selected);

    constructor(private actions$: Actions, private store$: Store<State>, private db: AngularFirestore) {
        db.firestore.settings({ timestampsInSnapshots: true });
    }

    @Effect()
    loadRequirements$: Observable<Action> = this.actions$
        .ofType(requirement.LOAD)
        .withLatestFrom(this.auth$, this.tenant$, this.project$)
        .filter(([a, u, t, p]) => u !== null && t !== null && p !== null)
        .mergeMap(([a, u, t, p]) => this.db.collection("/tenant/" + t + "/projects/" + p + "/requirements")
            .snapshotChanges())
        .map(tlist => new requirement.LoadSuccessAction(tlist.map(ax => {
            let t: Requirement = ax.payload.doc.data() as Requirement;
            t.id = ax.payload.doc.id;
            return t;
        })))
        .catch(err => of(new requirement.LoadFailAction(err)))

    @Effect()
    unloadRequirements$: Observable<Action> = this.actions$
        .filter(a => a.type === auth.SIGNOUT_SUCCESS || a.type === tenant.SELECT)
        .map(() => new requirement.ClearAction());


    @Effect()
    createRequirement$: Observable<Action> = this.actions$
        .ofType(requirement.CREATE)
        .map((action: requirement.CreateAction) => action.payload)
        .withLatestFrom(this.auth$, this.tenant$, this.project$)
        .filter(([r, u, t, p]) => u !== null && t !== null && p !== null)
        .mergeMap(([r, u, t, p]) => fromPromise(this.db.collection("/tenant/" + t + "/projects/" + p + "/requirements")
            .add(r)).map(() => r))
        .map((r) => new requirement.CreateSuccessAction(r))
        .catch(err => of(new requirement.CreateFailAction(err)));

    @Effect()
    deleteRequirement$: Observable<Action> = this.actions$
        .ofType(requirement.DELETE)
        .map((action: requirement.DeleteAction) => action.payload)
        .withLatestFrom(this.auth$, this.tenant$, this.project$)
        .filter(([r, u, t, p]) => u !== null && t !== null && p !== null)
        .mergeMap(([r, u, t, p]) => fromPromise(this.db.doc("/tenant/" + t + "/projects/" + p + "/requirements/" + r.id)
            .delete()).map(() => r))
        .map((r) => new requirement.DeleteSuccessAction(r))
        .catch(err => of(new requirement.DeleteFailAction(err)));

    @Effect()
    updateRequirement$: Observable<Action> = this.actions$
        .ofType(requirement.UPDATE)
        .map((action: requirement.UpdateAction) => action.payload)
        .withLatestFrom(this.auth$, this.tenant$, this.project$)
        .filter(([r, u, t, p]) => u !== null && t !== null && p !== null)
        .mergeMap(([r, u, t, p]) => fromPromise(this.db.doc("/tenant/" + t + "/projects/" + p + "/requirements/" + r.id)
            .update(r)).map(() => r))
        .map((r) => new requirement.UpdateSuccessAction(r))
        .catch(err => of(new requirement.UpdateFailAction(err)));

}
