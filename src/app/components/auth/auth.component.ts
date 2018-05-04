import { Component, OnInit } from '@angular/core';
import { SignupComponent } from '../signup/signup.component';
import { MatDialog } from '@angular/material';
import { LoginComponent } from '../login/login.component';
import { AuthService } from '../../services/auth.service';
import { ProgressService } from '../../services/progress.service';
import { TenantService } from '../../services/tenant.service';
import { Observable } from 'rxjs/Observable';
import { Tenant } from '../../domain/Tenant';

@Component({
  selector: 'auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor(public dialog: MatDialog, private auth: AuthService, private progress: ProgressService) { }

  loggedIn: boolean = false;
  tenant$:Observable<Tenant[]>

  ngOnInit() {
    this.auth.getUser().subscribe(u => {
      this.loggedIn = (u !== null);
    });
  }

  signUp() {
    let dialogRef = this.dialog.open(SignupComponent, {});
    dialogRef.afterClosed().subscribe(result => {
      this.progress.start();
      this.auth.signUp(result.email, result.password).subscribe((success) => {
        this.progress.finish();
      })
    });
  }

  signIn() {
    let dialogRef = this.dialog.open(LoginComponent, {});
    dialogRef.afterClosed().subscribe(result => {
      this.progress.start();
      this.auth.signIn(result.email, result.password).subscribe((success)=>{
        this.progress.finish();
      })
    });
  }

  signOut() {
    this.progress.start();
    this.auth.signOut().subscribe((success)=>{
      this.progress.finish();
    });
  }
}
