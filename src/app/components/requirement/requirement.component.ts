import { Component, OnInit, Input, HostListener } from '@angular/core';
import { Requirement } from '../../domain/requirement';
import { RequirementNode } from '../../domain/requirement-node';

import { Store } from '@ngrx/store';
import * as fromRoot from '../../store/reducers';
import * as requirement from '../../store/actions/requirement';

@Component({
  selector: 'requirement',
  templateUrl: './requirement.component.html',
  styleUrls: ['./requirement.component.scss']
})
export class RequirementComponent implements OnInit {

  constructor(private store$: Store<fromRoot.State>) { }

  editing: boolean = false;
  actionsVisible: boolean = false;

  @HostListener("mouseenter")
  showActions() { this.actionsVisible = true }
  @HostListener("mouseleave")
  hideActions() { this.actionsVisible = false }

  @Input("source")
  source: RequirementNode;
  @Input("level")
  level:number=0;

  ngOnInit() {
  }

  save() {
    this.editing = false;
    this.actionsVisible = false;
    this.store$.dispatch(new requirement.UpdateAction(this.source.requirement));
  }

  delete(){
    this.store$.dispatch(new requirement.DeleteAction(this.source.requirement));
  }

}
