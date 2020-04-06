import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {BlogDetailService} from "./blog-detail.service";
import { Blog } from 'src/app/model/blog';
import {UserService} from "../../../framework/service/user.service";
import {InfiniteScrollRunService} from "../../../framework/service/infinite-scroll-run.service";
import { BlogMsgService } from '../blog-msg.service';
import {TagMsgService} from "../../tags/tag-msg.service";

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
  item:Blog;
  isPi=false;
  index=0;
  constructor(private blogMsgService:BlogMsgService,
              private service:BlogDetailService,
              private userService:UserService,
              private tagMsgService:TagMsgService
              ) {
    this.userService.userObs$.subscribe(status=>this.isPi=status==1?true:false);
    this.blogMsgService.showObs$.subscribe((item:Blog)=>{
      if(item){
        this.item={...item};
        this.service.addBrowse(item.blogId).subscribe();
        this.service.getContent(item.blogId).subscribe((result:any)=>{
          if(result){
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
  //三种情况
  change(item?:Blog){
    if(item){
      this.index=0;
      this.item=item;
    } else {
      this.close();
    }
    this.blogMsgService.refreshList(true);
    this.tagMsgService.freshTags();

  }
  ngOnInit() {
  }
  close(){
    this.index = 0;
    this.item=null;
    this.isAdd = false;
    this.isEdit=false;
    this.visible=false;
  }
}
