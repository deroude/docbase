import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { Tenant } from '../../domain/Tenant';
import * as fromRoot from '../../store/reducers';
import { Store } from '@ngrx/store';
import { SelectAction } from '../../store/actions/tenant';

@Component({
  selector: 'tenant',
  templateUrl: './tenant.component.html',
  styleUrls: ['./tenant.component.scss']
})
export class TenantComponent implements OnInit {

  tenantId$: Observable<string>;

  constructor(private route: ActivatedRoute,
    private router: Router, private store: Store<fromRoot.State>) {
    this.tenantId$ = this.store.select(state => state.tenant.selected);
    this.route.paramMap.subscribe((params: ParamMap) => {
      if (params.get('tenantId')) {
        store.dispatch(new SelectAction(params.get('tenantId')))
      }
    });
  }


  ngOnInit() {
    this.tenantId$ = this.route.paramMap.map((params: ParamMap) => params.get('tenantId'));
  }

}
