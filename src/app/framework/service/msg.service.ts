import {Injectable} from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MsgService {
  private msg = new Subject<string>();
  msgObs$ = this.msg.asObservable();

  constructor() {
  }

  headFresh() {
    this.msg.next();
  }
}
