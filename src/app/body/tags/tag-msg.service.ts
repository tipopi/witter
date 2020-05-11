import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TagMsgService {
  private tagSource = new Subject();
  tagObs$ = this.tagSource.asObservable();
  private freshSource = new Subject();
  freshObs$ = this.freshSource.asObservable();

  constructor() {
  }

  freshTags() {
    this.freshSource.next();
  }

  setTag(tag) {
    this.tagSource.next(tag);
  }
}
