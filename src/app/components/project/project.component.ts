import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';

import { Requirement } from '../../domain/requirement';
import { RequirementNode } from '../../domain/requirement-node';

import * as fromRoot from '../../store/reducers';
import { CreateAction } from '../../store/actions/requirement';
import { SelectAction } from '../../store/actions/project';

@Component({
  selector: 'project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private router: Router, private store$: Store<fromRoot.State>) {
    this.route.paramMap.subscribe((params: ParamMap) => {
      if (params.get('projectId')) {
        store$.dispatch(new SelectAction(params.get('projectId')))
      }
    });
  }

  requirements$: Observable<RequirementNode[]> = this.store$
    .select(state => state.requirement.requirements)
    .map(rlist => RequirementNode.parse(rlist));


  ngOnInit() {
  }
}
