import { Component, HostBinding } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { Tenant } from '../../domain/Tenant';

import * as fromRoot from '../../store/reducers';
import * as fromProgress from '../../store/reducers/progress';

@Component({
  selector: 'app-root',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  @HostBinding("class") classes = "mat-app-background basic-container";

  progress$: Observable<fromProgress.State>;
  tenants$: Observable<Tenant[]>;

  constructor(private router: Router, private store: Store<fromRoot.State>) {
    this.progress$ = store.select(state => state.progress)
    this.tenants$ = store.select(state => state.tenant.tenants)
    this.store.select(state => state.auth.user).subscribe(u => {
      if (u === null) this.router.navigate(["home"]);
    });
  }
}
