import { Component, OnInit } from '@angular/core';
import {TagsService} from "../tags/tags.service";
import {DateService} from "../date/date.service";
import {InfiniteScrollRunService} from "../../framework/service/infinite-scroll-run.service";
import {TagMsgService} from "../tags/tag-msg.service";
import {BlogAddMsgService} from "./blog-detail/blog-add/blog-add-msg.service";
import {BlogDetailMsgService} from "./blog-detail/blog-detail-msg.service";

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
  providers:[TagMsgService,DateService,InfiniteScrollRunService,BlogDetailMsgService]
})
export class BlogComponent implements OnInit {

  constructor(private blogDetailMsgService:BlogDetailMsgService) { }

  ngOnInit() {
  }
  showBlogEditor(){
    this.blogDetailMsgService.show();
  }
}
