import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';


@Injectable()
export class AuthService {

  constructor(private afAuth: AngularFireAuth) { }

  public signUp(email: string, password: string): Observable<boolean> {
    return fromPromise(firebase.auth().createUserWithEmailAndPassword(email, password)).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }

  public signIn(email: string, password: string): Observable<boolean> {
    return fromPromise(this.afAuth.auth.signInWithEmailAndPassword(email, password)).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }

  public getUser(): Observable<firebase.User> {
    return this.afAuth.authState;
  }

  public signOut(): Observable<boolean> {
    return fromPromise(this.afAuth.auth.signOut()).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }
}
