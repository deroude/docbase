import { Component, OnInit, Input, HostListener } from '@angular/core';
import { Requirement } from '../../domain/requirement';

@Component({
  selector: 'requirement',
  templateUrl: './requirement.component.html',
  styleUrls: ['./requirement.component.scss']
})
export class RequirementComponent implements OnInit {

  constructor() { }

  editing: boolean = false;
  actionsVisible: boolean = false;

  @HostListener("mouseenter")
  showActions() { this.actionsVisible = true }
  @HostListener("mouseleave")
  hideActions() { this.actionsVisible = false }

  @Input("source")
  source: Requirement;

  ngOnInit() {
  }

  save() {
    this.editing = false;
    this.actionsVisible=false;
  }

}
