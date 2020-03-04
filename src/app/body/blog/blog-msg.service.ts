import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable()
export class BlogMsgService {
  private showSource=new Subject();
  private refreshListSource=new Subject();
  showObs$=this.showSource.asObservable();
  refreshList$=this.refreshListSource.asObservable();

  constructor() { }
  showDetail(item?:any){
    this.showSource.next(item);
  }
  refreshList(save:boolean){
    this.refreshListSource.next(save);
  }

}
