import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { Requirement } from '../../domain/requirement';
import { RequirementService } from '../../services/requirement.service';
import { RequirementNode } from '../../domain/requirement-node';

@Component({
  selector: 'project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private router: Router, private requirementService: RequirementService) { }

  requirements$: Observable<Requirement[]>;

  tenantId: string;
  projectId: string;

  ngOnInit() {
    this.requirements$ = combineLatest(this.route.parent.paramMap, this.route.paramMap)
      .filter(([tenantParam, projectParam]) => tenantParam.get("tenantId") !== null && projectParam.get("projectId") !== null)
      .switchMap(
        ([tenantParam, projectParam]) => {
          this.tenantId = tenantParam.get("tenantId");
          this.projectId = projectParam.get("projectId");
          return this.requirementService.getRequirements(
            this.tenantId, this.projectId
          );
        }
      )
      .map(rlist => this.processRankedList(rlist));
  }

  addRequirement() {
    let item: Requirement = {
      lastUpdated: new Date(),
      status: "unpublished",
      description: "",
      title: ""
    };
    this.requirementService.addRequirement(this.tenantId, this.projectId, item);
  }

  private processRankedList(raw: Requirement[]): Requirement[] {
    let tree: RequirementNode[] = RequirementNode.parse(raw);
    return tree.map(rn => rn.toArray()).reduce((p, c) => p.concat(c));
  }

}
