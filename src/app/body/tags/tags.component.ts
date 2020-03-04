import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {TagsService} from "./tags.service";
import {Tag} from "../../model/tag";
import {UserService} from "../../framework/service/user.service";
import {TagMsgService} from "./tag-msg.service";
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css'],
  providers:[TagsService]
})
export class TagsComponent implements OnInit {
  tags: Tag[] = [];
  @Input() type: number;
  isPi=false;
  deleteModal=false;
  checkTag:string='all';
  index=0;
  constructor(private service: TagsService,private userService:UserService,private tagMsgService:TagMsgService) {
    this.userService.userObs$.subscribe(status=> this.isPi=status==1?true:false);
    this.tagMsgService.freshObs$.subscribe(_=>this.fresh());
  }

  ngOnInit() {
    this.fresh();
  }
  fresh(){
    this.service.findCount(this.type).pipe(delay(0)).subscribe((da: any) => {
      if (da.meta.code===1) {
        this.tags=da.data;
      }
    });
  }
  deleteTag(id){
    this.service.delete(id).subscribe((msg:any)=>{
      if(msg.meta.code===1){
        this.fresh();
        if(this.checkTag==id||this.checkTag=='all'){
          this.outTag('all');
          this.index=0;
        }
      }
    });
  }
  outTag(id) {
    this.checkTag=id;
    this.tagMsgService.setTag(id);
  }

}
