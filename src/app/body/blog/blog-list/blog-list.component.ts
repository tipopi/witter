import { Component, OnInit } from '@angular/core';
import {Img} from "../../../model/img";
import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';
import {InfiniteScrollRunService} from "../../../framework/service/infinite-scroll-run.service";
import {ScrollListService} from "../../show/scroll-list/scroll-list.service";
import {UserService} from "../../../framework/service/user.service";
import {TagsService} from "../../tags/tags.service";
import {DateService} from "../../date/date.service";
import { BlogListService } from './blog-list.service';
import {TagMsgService} from "../../tags/tag-msg.service";
import {BlogAddMsgService} from "../blog-detail/blog-add/blog-add-msg.service";
import { BlogMsgService } from '../blog-msg.service';
import { NzMessageService } from 'ng-zorro-antd';


@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css'],
  providers:[BlogListService]
})
export class BlogListComponent implements OnInit {
  item$;
  date:Date=this.setDate();
  tag:string="all";
  isPi:boolean=false;
  token;
  hasItem:boolean=false;
  tagColor=new Map([
    [0,'magenta'],
    [1,'purple'],
    [2,'blue'],
    [3,'volcano']
  ]);
  handle=page=>{
    return this.service.findList(this.tag,this.date,page).pipe(
      map((item:any)=>{
        if(item.meta.code===1){
          return item.data;
        }
        return [];
      }))
  }
  option={
    handle:this.handle,
    itemNumber:8,
    itemHeight:100,
    style:{
      height:'800px',
      width:'1200px'
    },
    pageInit:2
  }
  constructor(private scrollService:InfiniteScrollRunService,
              private service:BlogListService,
              private userService:UserService,
              private tagsService:TagMsgService,
              private dateService:DateService,
              private blogMsgService:BlogMsgService,
              private nzMessageService: NzMessageService
              ) {

    this.tagsService.tagObs$.subscribe((tag:string)=> {
      this.tag = tag;
      this.scrollService.refreshData(this.handle);
    });
    this.dateService.dateObs$.subscribe((date:Date)=>{
      this.date=date;
      this.scrollService.refreshData(this.handle);
    });
    this.blogMsgService.refreshList$.subscribe((save:boolean)=>{
      this.scrollService.refreshData(this.handle,save);
    });
    this.userService.userObs$.subscribe(status=>this.isPi=status==1?true:false);
    this.userService.tokenObs$.subscribe(token=>this.token=token);
  }
  ngAfterViewInit(): void {
    this.item$=this.scrollService.init(this.option);
    this.item$.subscribe(t=>this.hasItem=(t.length===0));
  }
  ngOnInit() {
  }
  detailShow(item){
    this.blogMsgService.showDetail(item);
  }
  deleteBlog(blogId){
    this.service.deleteBlog(blogId,this.token).subscribe((result:any)=>{
      if(result){
        this.nzMessageService.info("删除成功");
        // this.userService.setToken(result.meta.token);
        this.scrollService.refreshData(this.handle,true);
        this.tagsService.freshTags();
      }else {
        this.nzMessageService.error("删除失败，系统错误");
      }
    })
  }
  setDate(){
    //获取下一天日期
    let date=new Date();
    date=new Date(date.setDate(date.getDate()+1));
    return date;
  }
}
