import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
import {MsgService} from "../../msg.service";


@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {
  tag: string ='all';
  refresh: boolean=true;
  date: Date=new Date();
  constructor( private cdr: ChangeDetectorRef,private msg: MsgService) {
    this.msg.msgObs$.subscribe(()=>this.onLoadNext());
  }

  ngOnInit() {
  }
  onChange(result: Date): void {
    this.date=result;
    this.onLoadNext();
  }
  onLoadNext() {
    this.refresh = false;
    this.cdr.detectChanges();
    this.refresh = true;
    this.cdr.detectChanges();
  }
  onTag(id){
    this.tag=id;
    this.onLoadNext();
  }

}
