import { Injectable } from '@angular/core';

import { AngularFirestore } from 'angularfire2/firestore'
import { ProgressService } from './progress.service';
import { AuthService } from './auth.service';
import { Tenant } from '../domain/Tenant';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

@Injectable()
export class TenantService {

  constructor(private db: AngularFirestore, private progress: ProgressService, private auth: AuthService) {
    db.firestore.settings({ timestampsInSnapshots: true });
  }

  public getTenants(): Observable<Tenant[]> {
    return this.auth.getAfterAuth(u => this.db.collection<Tenant>("/tenant")
      .snapshotChanges().map(actions => actions.map(a => {
        let t: Tenant = a.payload.doc.data() as Tenant;
        t.id = a.payload.doc.id;
        return t;
      }).filter((t: Tenant) => t.members.includes(u.uid)))
    );
  }

  public getTenant(id: string): Observable<Tenant> {
    return this.auth.getAfterAuth(u => this.db.collection<Tenant>("/tenant").doc<Tenant>(id).valueChanges());
  }


}
