import { Component, OnInit } from '@angular/core';
import { SignupComponent } from '../signup/signup.component';
import { MatDialog } from '@angular/material';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }
  
  signup() {
    let dialogRef = this.dialog.open(SignupComponent, {});

    dialogRef.afterClosed().subscribe(result => {
      console.log('The singup dialog was closed', result);
    });
  }

  login() {
    let dialogRef = this.dialog.open(LoginComponent, {});

    dialogRef.afterClosed().subscribe(result => {
      console.log('The login dialog was closed', result);
    });
  }
}
