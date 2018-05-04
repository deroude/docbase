import { Component, OnInit, Input } from '@angular/core';
import { Tenant } from '../../domain/Tenant';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operator/switchMap';
import { TenantService } from '../../services/tenant.service';
import { Project } from '../../domain/project';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {

  constructor(private projectService: ProjectService) { }

  @Input("tenantId")
  tenantId: string;

  projects$: Observable<Project[]>;

  ngOnInit() {
    this.projects$ = this.projectService.getProjects(this.tenantId);
  }

}
