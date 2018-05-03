import { Component, OnInit } from '@angular/core';
import { SignupComponent } from '../signup/signup.component';
import { MatDialog } from '@angular/material';
import { LoginComponent } from '../login/login.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor(public dialog: MatDialog, private auth: AuthService) { }

  loggedIn: boolean = false;

  ngOnInit() {
    this.auth.getUser().subscribe(u => {
      this.loggedIn = (u !== null);
    });
  }

  signUp() {
    let dialogRef = this.dialog.open(SignupComponent, {});
    dialogRef.afterClosed().subscribe(result => {
      this.auth.signUp(result.email, result.password);
    });
  }

  signIn() {
    let dialogRef = this.dialog.open(LoginComponent, {});
    dialogRef.afterClosed().subscribe(result => {
      this.auth.signIn(result.email, result.password);
    });
  }

  signOut(){
    this.auth.signOut();
  }
}
