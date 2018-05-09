import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';
import { switchMap } from 'rxjs/operator/switchMap';

import { Project } from '../../domain/project';

import * as fromRoot from '../../store/reducers';

@Component({
  selector: 'project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {

  projects$: Observable<Project[]>;

  constructor(private store: Store<fromRoot.State>) {
    this.projects$ = store.select(state => state.project.projects);
  }

  ngOnInit() {
  }

}
