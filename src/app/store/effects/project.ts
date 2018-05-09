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
import * as auth from "../actions/auth";

import { State } from '../reducers';
import { Tenant } from '../../domain/Tenant';
import { Project } from '../../domain/project';

@Injectable()
export class ProjectEffects {

    private auth$: Observable<firebase.User>;

    constructor(private actions$: Actions, private store$: Store<State>, private db: AngularFirestore) {
        db.firestore.settings({ timestampsInSnapshots: true });
        this.auth$ = store$.select(state => state.auth.user);
    }

    @Effect()
    loadProjects$: Observable<Action> = this.actions$
        .ofType(tenant.SELECT)
        .map((action: tenant.SelectAction) => action.payload)
        .withLatestFrom(this.auth$)
        .filter(([t, u]) => u !== null)
        .mergeMap(([t, u]) => this.db.collection<Project>("/tenant/" + t + "/projects")
            .snapshotChanges().map(actions => actions.map(a => {
                let t: Project = a.payload.doc.data() as Project;
                t.id = a.payload.doc.id;
                return t;
            })))
        .map(tlist => new project.LoadSuccessAction(tlist))
        .catch(err => of(new project.LoadFailAction(err)))

    @Effect()
    unloadProjects$: Observable<Action> = this.actions$
        .ofType(auth.SIGNOUT_SUCCESS)
        .map(() => new project.ClearAction());

}
