import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProjectListComponent } from './components/project-list/project-list.component';
import { TenantComponent } from './components/tenant/tenant.component';
import { ProjectComponent } from './components/project/project.component';
import { HomeComponent } from './components/home/home.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'tenant/:tenantId', component: TenantComponent,
    children: [
      { path: '', redirectTo: 'project', pathMatch: 'full' },
      { path: 'project/:projectId', component: ProjectComponent }
    ]
  }
];

@NgModule({
  exports: [
    RouterModule
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    )
  ]
})
export class AppRoutingModule { }