import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MainComponent } from './components/main/main.component';
import { AppMaterialModule } from './app.material.module';
import { AppRoutingModule } from './app.routing.module';
import { RequirementComponent } from './components/requirement/requirement.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { environment } from '../environments/environment';
import { AuthService } from './services/auth.service';

import { AuthComponent } from './components/auth/auth.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { AngularFireAuth } from 'angularfire2/auth';
import { ProgressService } from './services/progress.service';
import { TenantService } from './services/tenant.service';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { ProjectService } from './services/project.service';
import { TenantComponent } from './components/tenant/tenant.component';
import { ProjectComponent } from './components/project/project.component';
import { RequirementService } from './services/requirement.service';
import { MarkedPipe } from './pipes/marked.pipe';
import { HomeComponent } from './components/home/home.component';
import { MarkdownEditorDirective } from './directives/mde.directive';


@NgModule({
  declarations: [
    MainComponent,
    RequirementComponent,
    AuthComponent,
    SignupComponent,
    LoginComponent,
    ProjectListComponent,
    TenantComponent,
    ProjectComponent,
    MarkedPipe,
    HomeComponent,
    MarkdownEditorDirective,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
  providers: [AuthService, AngularFireAuth, ProgressService, TenantService, ProjectService, RequirementService],
  bootstrap: [MainComponent],
  entryComponents: [LoginComponent, SignupComponent]
})
export class AppModule { }
