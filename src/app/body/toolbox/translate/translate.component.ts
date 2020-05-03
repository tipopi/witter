import { Component, OnInit } from '@angular/core';
import {Md5} from 'ts-md5/dist/md5';

import {TranslateService} from "./translate.service";
import { Trans } from 'src/app/model/trans';
import {NzMessageService} from "ng-zorro-antd";
@Component({
  selector: 'app-translate',
  templateUrl: './translate.component.html',
  styleUrls: ['./translate.component.css']
})
export class TranslateComponent implements OnInit {
  input:string;
  result:string;
  from='auto';
  to='en';
  constructor(private service:TranslateService,private nzMessageService: NzMessageService) { }

  ngOnInit() {
  }
  change(){
    if(this.from=='auto'){
      this.nzMessageService.info('自动转换不需要互换');
    }else {
      let swap=this.from;
      this.from=this.to;
      this.to=swap;
    }
  }
  trans(){
    this.service.postTrans(this.input,this.from,this.to).subscribe((res:any)=>{
        this.result=res.trans_result[0].dst;

    });

  }

}
