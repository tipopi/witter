import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-json-util',
  templateUrl: './json-util.component.html',
  styleUrls: ['./json-util.component.css']
})
export class JsonUtilComponent implements OnInit {
  in='';
  result='';
  error=false;
  constructor() { }
  change(){
    let ob;
    try{
      ob=JSON.parse(this.in);
      this.error=false;
    }catch(e){
      this.result=e;
      this.error=true;
      return
    }
    this.result=JSON.stringify(ob, null, 2);
  }
  ngOnInit() {
  }

}
