import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {
  tag:string ='all';
  refresh:boolean=true;
  date:Date=new Date();

  constructor() { }

  ngOnInit() {
  }
  onChange(result: Date): void {
    this.date=result;
    this.refresh=false;
    this.refresh=true;
  }

  onOk(result: Date): void {
    this.date=result;
    this.refresh=false;
    this.refresh=true;
  }
}
