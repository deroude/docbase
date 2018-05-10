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

import * as tenant from "../actions/tenant";
import * as project from "../actions/project";
import * as requirement from "../actions/requirement";
import * as auth from "../actions/auth";

import { State } from '../reducers';
import { Tenant } from '../../domain/Tenant';
import { Project } from '../../domain/project';
import { FirestoreService } from '../../services/firestore.service';

@Injectable()
export class ProjectEffects {

    private tenant$: Observable<string> = this.store$.select(state => state.tenant.selected);
    private auth$: Observable<any> = this.store$.select(state => state.auth.user);

    constructor(private actions$: Actions, private store$: Store<State>, private db: FirestoreService) { }

    @Effect()
    loadProjects$: Observable<Action> = this.actions$
        .ofType(project.LOAD)
        .withLatestFrom(this.tenant$)
        .filter(([a, t]) => t !== null)
        .switchMap(([a, t]) => this.db.getCollection<Project>("/tenant/" + t + "/projects")
            .takeUntil(this.auth$.filter(u => u === null))
        )
        .map(tlist => new project.LoadSuccessAction(tlist))
        .catch(err => of(new project.LoadFailAction(err)))

    @Effect()
    unloadProjects$: Observable<Action> = this.actions$
        .ofType(auth.SIGNOUT)
        .map(() => new project.ClearAction());

    @Effect()
    selectProject$: Observable<Action> = this.actions$
        .ofType(project.SELECT)
        .map(() => new requirement.LoadAction());

}
