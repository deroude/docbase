import { Component, OnInit, Input } from '@angular/core';
import { Requirement } from '../../domain/requirement';

@Component({
  selector: 'requirement',
  templateUrl: './requirement.component.html',
  styleUrls: ['./requirement.component.scss']
})
export class RequirementComponent implements OnInit {

  constructor() { }

  @Input("source")
  source: Requirement;

  ngOnInit() {
  }

}
