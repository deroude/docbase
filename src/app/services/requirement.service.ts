import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { ProgressService } from './progress.service';
import { Observable } from 'rxjs/Observable';
import { Requirement } from '../domain/requirement';

@Injectable()
export class RequirementService {

  constructor(private db: AngularFirestore, private progress: ProgressService, private auth: AuthService) { }

  public getRequirements(tenantId: string, projectId: string): Observable<Requirement[]> {
    return this.auth.getAfterAuth(u => this.db.collection("/tenant/" + tenantId + "/projects/" + projectId + "/requirements")
      .snapshotChanges().map(actions => actions.map(a => {
        let t: Requirement = a.payload.doc.data() as Requirement;
        t.id = a.payload.doc.id;
        return t;
      }))
    );
  }


}
