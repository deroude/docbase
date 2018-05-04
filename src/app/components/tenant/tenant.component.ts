import { Component, OnInit, Input } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Tenant } from '../../domain/Tenant';
import { Observable } from 'rxjs/Observable';
import { TenantService } from '../../services/tenant.service';

@Component({
  selector: 'tenant',
  templateUrl: './tenant.component.html',
  styleUrls: ['./tenant.component.scss']
})
export class TenantComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private router: Router, private tenantService: TenantService) { }

  tenantId$: Observable<string>;

  ngOnInit() {
    this.tenantId$ = this.route.paramMap.map((params: ParamMap) => params.get('tenantId'));
  }

}
