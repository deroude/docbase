import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/combineLatest';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { of } from 'rxjs/observable/of';

import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';

import * as tenant from "../actions/tenant";
import * as project from "../actions/project";
import * as requirement from "../actions/requirement";
import * as auth from "../actions/auth";

import { State } from '../reducers';
import { Tenant } from '../../domain/Tenant';
import { Project } from '../../domain/project';
import { Requirement } from '../../domain/requirement';

@Injectable()
export class RequirementEffects {

    private auth$: Observable<firebase.User>;
    private tenant$: Observable<string>;
    private project$: Observable<string>;

    constructor(private actions$: Actions, private store$: Store<State>, private db: AngularFirestore) {
        db.firestore.settings({ timestampsInSnapshots: true });
        this.auth$ = store$.select(state => state.auth.user);
        this.tenant$ = store$.select(state => state.tenant.selected);
    }

    @Effect()
    loadRequirements$: Observable<Action> = this.actions$
        .ofType(project.SELECT)
        .map((action: project.SelectAction) => action.payload)
        .combineLatest(this.auth$, this.tenant$)
        .filter(([p, u, t]) => u !== null && t !== null)
        .mergeMap(([p, u, t]) => this.db.collection("/tenant/" + t + "/projects/" + p + "/requirements")
            .snapshotChanges().map(actions => actions.map(a => {
                let t: Requirement = a.payload.doc.data() as Requirement;
                t.id = a.payload.doc.id;
                return t;
            })))
        .map(tlist => new requirement.LoadSuccessAction(tlist))
        .catch(err => of(new requirement.LoadFailAction(err)))

    @Effect()
    unloadRequirements$: Observable<Action> = this.actions$
        .filter(a => a.type === auth.SIGNOUT_SUCCESS || a.type === tenant.SELECT)
        .map(() => new requirement.ClearAction());


    @Effect()
    createRequirement$: Observable<Action> = this.actions$
        .ofType(requirement.CREATE)
        .map((action: requirement.CreateAction) => action.payload)
        .combineLatest(this.auth$, this.tenant$, this.project$)
        .filter(([r, u, t, p]) => u !== null && t !== null && p !== null)
        .mergeMap(([r, u, t, p]) => fromPromise(this.db.collection("/tenant/" + t + "/projects/" + p + "/requirements")
            .add(r)).map(() => r))
        .map((r) => new requirement.CreateSuccessAction(r));
}
