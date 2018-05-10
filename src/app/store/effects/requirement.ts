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
import { FirestoreService } from '../../services/firestore.service';

@Injectable()
export class RequirementEffects {

    private tenant$: Observable<string> = this.store$.select(state => state.tenant.selected);
    private project$: Observable<string> = this.store$.select(state => state.project.selected);
    private auth$: Observable<any> = this.store$.select(state => state.auth.user);

    constructor(private actions$: Actions, private store$: Store<State>, private db: FirestoreService) { }

    @Effect()
    loadRequirements$: Observable<Action> = this.actions$
        .ofType(requirement.LOAD)
        .withLatestFrom(this.tenant$, this.project$)
        .filter(([a, t, p]) => t !== null && p !== null)
        .switchMap(([a, t, p]) => this.db.getCollection<Requirement>("/tenant/" + t + "/projects/" + p + "/requirements")
            .takeUntil(this.auth$.filter(u => u === null))
        )
        .map(tlist => new requirement.LoadSuccessAction(tlist))
        .catch(err => of(new requirement.LoadFailAction(err)))

    @Effect()
    unloadRequirements$: Observable<Action> = this.actions$
        .filter(a => a.type === auth.SIGNOUT || a.type === tenant.SELECT)
        .map(() => new requirement.ClearAction());


    @Effect()
    createRequirement$: Observable<Action> = this.actions$
        .ofType(requirement.CREATE)
        .map((action: requirement.CreateAction) => action.payload)
        .withLatestFrom(this.tenant$, this.project$)
        .filter(([r, t, p]) => t !== null && p !== null)
        .mergeMap(([r, t, p]) => this.db.create("/tenant/" + t + "/projects/" + p + "/requirements", r))
        .map((r) => new requirement.CreateSuccessAction(r))
        .catch(err => of(new requirement.CreateFailAction(err)));

    @Effect()
    deleteRequirement$: Observable<Action> = this.actions$
        .ofType(requirement.DELETE)
        .map((action: requirement.DeleteAction) => action.payload)
        .withLatestFrom(this.tenant$, this.project$)
        .filter(([r, t, p]) => t !== null && p !== null)
        .mergeMap(([r, t, p]) => this.db.delete("/tenant/" + t + "/projects/" + p + "/requirements/" + r.id, r))
        .map((r) => new requirement.DeleteSuccessAction(r))
        .catch(err => of(new requirement.DeleteFailAction(err)));

    @Effect()
    updateRequirement$: Observable<Action> = this.actions$
        .ofType(requirement.UPDATE)
        .map((action: requirement.UpdateAction) => action.payload)
        .withLatestFrom(this.tenant$, this.project$)
        .filter(([r, t, p]) => t !== null && p !== null)
        .mergeMap(([r, t, p]) => this.db.update("/tenant/" + t + "/projects/" + p + "/requirements/" + r.id, r))
        .map((r) => new requirement.UpdateSuccessAction(r))
        .catch(err => of(new requirement.UpdateFailAction(err)));

    // @Effect()
    // reloadAfterEffect$: Observable<Action> = this.actions$
    //     .filter(a => a.type === requirement.UPDATE_SUCCESS
    //         || a.type === requirement.DELETE_SUCCESS
    //         || a.type === requirement.CREATE_SUCCESS)
    //     .map(a => new requirement.LoadAction());

}
