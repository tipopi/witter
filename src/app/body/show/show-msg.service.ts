import {Injectable} from '@angular/core';
import {Subject} from "rxjs";

@Injectable()
export class ShowMsgService {
  private refreshListSource = new Subject();
  refreshList$ = this.refreshListSource.asObservable();

  constructor() {
  }

  refreshList(save: boolean) {
    this.refreshListSource.next(save);
  }
}
