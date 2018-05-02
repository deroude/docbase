import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';

import { Project } from '../domain/project';
import { Requirement } from '../domain/requirement';
import { DocRecord } from '../domain/doc-record';

@Injectable()
export class RecordService {

  constructor(private db: AngularFirestore) { }

  public getProjects(): Observable<Project[]> {
    return this.db.collection<Project>("record",
      ref => ref.where("type", "==", "project").orderBy("dateCreated", "desc")
    ).valueChanges();
  }

  public getRequirements(project: Project): Observable<Requirement[]> {
    return this.db.collection<Requirement>("record",
      ref => ref
        .where("type", "==", "requirement")
        .where("parent", "==", project.id)
        .orderBy("name", "asc")
    ).valueChanges();
  }

  public addRecord(record: DocRecord): Observable<DocRecord> {
    record.id = this.db.createId();
    return fromPromise(this.db.collection<DocRecord>("record").doc(record.id).set(record))
      .map(() => record);
  }

}
