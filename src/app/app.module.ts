import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core'; 
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

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


@NgModule({
  declarations: [
    MainComponent,
    RequirementComponent,
    AuthComponent,
    SignupComponent,
    LoginComponent
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
  providers: [AuthService],
  bootstrap: [MainComponent],
  entryComponents:[LoginComponent,SignupComponent]
})
export class AppModule { }
