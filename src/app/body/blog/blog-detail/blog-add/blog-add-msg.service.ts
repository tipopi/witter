import {Injectable} from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BlogAddMsgService {
  private showSource = new Subject();
  showObs$ = this.showSource.asObservable();

  constructor() {
  }

  show(item?: any) {
    this.showSource.next(item);
  }
}
