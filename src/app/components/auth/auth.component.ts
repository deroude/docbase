import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';

import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';

import * as fromRoot from '../../store/reducers';
import * as firebase from 'firebase/app';
import { SignupAction, SigninAction, SignoutAction } from '../../store/actions/auth';


@Component({
  selector: 'auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  auth$: Observable<firebase.User>;

  constructor(public dialog: MatDialog, private store: Store<fromRoot.State>) {
    this.auth$ = store.select(state => state.auth.user);
  }

  ngOnInit() {

  }

  signUp() {
    let dialogRef = this.dialog.open(SignupComponent, {});
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(new SignupAction(result))
      }
    });
  }

  signIn() {
    let dialogRef = this.dialog.open(LoginComponent, {});
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(new SigninAction(result))
      }
    });
  }

  signOut() {
    this.store.dispatch(new SignoutAction())
  }
}
