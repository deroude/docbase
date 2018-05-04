import { Component, HostBinding } from '@angular/core';
import { ProgressService } from '../../services/progress.service';
import { TenantService } from '../../services/tenant.service';
import { Tenant } from '../../domain/Tenant';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  @HostBinding("class") classes = "mat-app-background basic-container";

  progressBarShown: boolean = false;
  tenant$: Observable<Tenant[]>;

  constructor(private progress: ProgressService, private tenantService: TenantService, private router: Router, private auth: AuthService) {
    this.progress.get().subscribe(val => this.progressBarShown = val);
    this.tenant$ = this.tenantService.getTenants();
    this.tenant$.subscribe(re => { if (re !== null) this.progress.finish() });
    this.auth.getUser().subscribe(u=>{
      if(u===null) this.router.navigate(["home"]);
    });
  }
}
