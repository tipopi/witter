import { Component, OnInit } from '@angular/core';
import {BlogDetailMsgService} from "./blog-detail-msg.service";
import {BlogDetailService} from "./blog-detail.service";
import { Blog } from 'src/app/model/blog';
import {UserService} from "../../../framework/service/user.service";

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css'],
  providers:[BlogDetailService]
})
export class BlogDetailComponent implements OnInit {
  visible=false;
  isEdit=false;
  isAdd=false;
  item:any;
  isPi=false;
  constructor(private blogDetailMsgService:BlogDetailMsgService,
              private service:BlogDetailService,
              private userService:UserService
              ) {
    this.userService.userObs$.subscribe(status=>this.isPi=status==1?true:false);
    this.blogDetailMsgService.showObs$.subscribe((item:Blog)=>{
      if(item){
        this.item=item;
        this.service.getContent(item.blogId).subscribe((result:any)=>{
          if(result.meta.code==1){
            this.item.content=result.data.content;
            this.item.tags=result.data.tags;
          }
        });
      }else {
        this.isAdd=true;
        this.isEdit=true;
      }
      this.visible=true;
    });

  }

  ngOnInit() {
  }
  close(){
    this.item=null;
    this.isAdd = false;
    this.isEdit=false;
    this.visible=false;
  }
}
