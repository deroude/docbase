import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ProgressService {

  constructor() { }

  progress$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public start() {
    this.progress$.next(true);
  }

  public finish() {
    this.progress$.next(false);
  }

  public get(): Observable<boolean> {
    return this.progress$;
  }
}
