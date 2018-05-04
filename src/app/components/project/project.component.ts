import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { Requirement } from '../../domain/requirement';
import { RequirementService } from '../../services/requirement.service';

@Component({
  selector: 'project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private router: Router, private requirementService: RequirementService) { }

  requirements$: Observable<Requirement[]>;

  ngOnInit() {
    this.requirements$ = combineLatest(this.route.parent.paramMap, this.route.paramMap)
    .filter(([tenantParam,projectParam])=>tenantParam.get("tenantId")!==null&&projectParam.get("projectId")!==null)  
    .switchMap(
        ([tenantParam, projectParam]) => {
          return this.requirementService.getRequirements(
            tenantParam.get("tenantId"), projectParam.get("projectId")
          );
        }
      );
  }

}
