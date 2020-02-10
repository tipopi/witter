import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {TagsService} from "./tags.service";
import {Tag} from "../../model/tag";
import {UserService} from "../../framework/service/user.service";
import {TagMsgService} from "./tag-msg.service";

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
  constructor(private service: TagsService,private userService:UserService,private tagMsgService:TagMsgService) {
    this.userService.userObs$.subscribe(status=> this.isPi=status==1?true:false);
  }

  ngOnInit() {
    this.fresh();
    this.tagMsgService.freshObs$.subscribe(_=>this.fresh());
  }
  fresh(){
    this.service.findCount(this.type).subscribe((da: any) => {
      if (da.meta.code===1) {
        this.tags=da.data;
      }
    });
  }
  deleteTag(id){
    this.service.delete(id).subscribe((msg:any)=>{
      if(msg.meta.code===1){
        this.fresh();
      }
    });
  }
  outTag(id) {
    this.tagMsgService.setTag(id);
  }

}
