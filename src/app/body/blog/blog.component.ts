import { Component, OnInit } from '@angular/core';
import {TagsService} from "../tags/tags.service";
import {DateService} from "../date/date.service";
import {InfiniteScrollRunService} from "../../framework/service/infinite-scroll-run.service";
import {TagMsgService} from "../tags/tag-msg.service";
import {BlogAddMsgService} from "./blog-detail/blog-add/blog-add-msg.service";
import { BlogMsgService } from './blog-msg.service';
import {UserService} from "../../framework/service/user.service";

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
  providers:[TagMsgService,DateService,InfiniteScrollRunService,BlogMsgService]
})
export class BlogComponent implements OnInit {
  isPi:boolean=false;
  constructor(private blogMsgService:BlogMsgService,private userService:UserService) {
    this.userService.userObs$.subscribe(status=>this.isPi=status==1?true:false);
  }

  ngOnInit() {
  }
  showBlogEditor(){
    this.blogMsgService.showDetail();
  }
}
