import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { Requirement } from '../../domain/requirement';
import { RequirementNode } from '../../domain/requirement-node';
import { Store } from '@ngrx/store';

import 'rxjs/add/operator/take';

import * as fromRoot from "../../store/reducers";
import { CreateAction } from '../../store/actions/requirement';

@Component({
  selector: 'requirement-list',
  templateUrl: './requirement-list.component.html',
  styleUrls: ['./requirement-list.component.scss']
})
export class RequirementListComponent implements OnInit {

  @Input("requirements")
  requirements: RequirementNode[];
  @Input("level")
  level: number = 0;
  @Input("parent")
  parent: Requirement = null;

  constructor(private store$: Store<fromRoot.State>) { }

  ngOnInit() {
  }

  addRequirement() {
    this.store$.select(state => state.auth.user).take(1).subscribe(u => {
      if (u !== null) {
        let r: Requirement = {
          author: u.email,
          description: "",
          lastUpdated: new Date(),
          order: this.requirements.length + 1,
          status: "unpublished",
          title: "",
          level: this.level,
          parent: this.parent?this.parent.id:null
        };
        this.store$.dispatch(new CreateAction(r));
      }
    });

  }


}
