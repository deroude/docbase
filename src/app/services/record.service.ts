import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable()
export class RecordService {

  constructor(private db: AngularFirestore) { }

}
