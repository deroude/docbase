import { Injectable } from '@angular/core';

import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/takeWhile';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

export interface ID {
  id?: string;
}

@Injectable()
export class FirestoreService {

  constructor(private db: AngularFirestore, private afAuth: AngularFireAuth) {
    db.firestore.settings({ timestampsInSnapshots: true });
  }

  public getCollection<T extends ID>(path: string, checkAuth: boolean = true): Observable<T[]> {
    if (!checkAuth || this.afAuth.auth.currentUser)
      return this.db.collection(path).snapshotChanges()
        .map(actions => {
          console.log(actions);
          return actions.map(ax => {
            let tx: T = ax.payload.doc.data() as T;
            tx.id = ax.payload.doc.id;
            return tx;
          })
        })
    else return of([]);
  }

  public create<T extends ID>(path: string, item: T, checkAuth: boolean = true): Observable<T> {
    if (!checkAuth || this.afAuth.auth.currentUser)
      return fromPromise(this.db.collection(path).add(item)).map(ref => Object.assign({}, item, { id: ref.id }));
    else return of(null);
  }

  public update<T extends ID>(path: string, item: T, checkAuth: boolean = true): Observable<T> {
    if (!checkAuth || this.afAuth.auth.currentUser)
      return fromPromise(this.db.doc(path).update(item)).map(() => item);
    else return of(null);
  }

  public delete<T extends ID>(path: string, item: T, checkAuth: boolean = true): Observable<T> {
    if (!checkAuth || this.afAuth.auth.currentUser)
      return fromPromise(this.db.doc(path).delete()).map(() => item);
    else return of(null);
  }

  public signIn(email: string, password: string): Observable<firebase.User> {
    return fromPromise(this.afAuth.auth.signInWithEmailAndPassword(email, password));
  }

  public signOut(): Observable<void> {
    return fromPromise(this.afAuth.auth.signOut());
  }

  public signUp(email: string, password: string, fullName?: string): Observable<firebase.User> {
    return fromPromise(this.afAuth.auth.createUserWithEmailAndPassword(email, password));
  }

}
