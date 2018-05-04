import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { ProgressService } from './progress.service';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Observable';
import { Project } from '../domain/project';

@Injectable()
export class ProjectService {

  constructor(private db: AngularFirestore, private progress: ProgressService, private auth: AuthService) { }

  public getProjects(tenantId: string): Observable<Project[]> {
    return this.auth.getAfterAuth(u => this.db.collection<Project>("/tenant/" + tenantId + "/projects")
      .snapshotChanges().map(actions => actions.map(a => {
        let t: Project = a.payload.doc.data() as Project;
        t.id = a.payload.doc.id;
        return t;
      }))
    );
  }

}
