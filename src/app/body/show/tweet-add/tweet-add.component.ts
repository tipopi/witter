import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {Img} from "../../../model/img";
import {TweetAddService} from "./tweet-add.service";
import {LocalStorage} from "../../../local.storage";
import {Tag} from "../../../model/tag";
import {UserService} from "../../../framework/service/user.service";
import {ShowMsgService} from "../show-msg.service";
import {TagMsgService} from "../../tags/tag-msg.service";
import {NzMessageService} from "ng-zorro-antd";

@Component({
  selector: 'app-tweet-add',
  templateUrl: './tweet-add.component.html',
  styleUrls: ['./tweet-add.component.css'],
  providers: [TweetAddService]
})
export class TweetAddComponent implements OnInit {
  @Output() fresh: EventEmitter<null> = new EventEmitter<null>();
  isVisible: boolean;
  img;
  userName;
  inputValue: string;
  inputTag: string;
  tags: Tag[]=[];
  tagColor=new Map([
    [0,'magenta'],
    [1,'purple'],
    [2,'blue'],
    [3,'volcano']
  ]);
  user:number;

  constructor(private servic: TweetAddService,
              private userService:UserService,
              private showMsgService : ShowMsgService,
              private tagMsgService:TagMsgService,
              private nzMessage:NzMessageService
              ) {
    this.userService.userObs$.subscribe(user=>this.user=user);
  }

  ngOnInit() {

  }

  addTweet(){
    if(this.inputValue.length>255){
      this.nzMessage.error('字符不能超过255');
      return;
    }else if(this.inputValue.length==0){
      this.nzMessage.error('不要发空气');
      return;
    }
    let string = this.inputValue.replace(/\r\n/g,"<br>");
    string = string.replace(/\n/g,"<br/>");
    string = string.replace(/\s/g,"&nbsp;");
    this.servic.addTweet(this.user,string).subscribe((da: any)=>{
      if(da.meta.code=='1'&&this.tags.length!=0){
        let id=da.data;
        let tags=[];
        this.tags.forEach(item=>tags.push(item.id));
        this.servic.addMap(id,tags).subscribe((da: any)=>{
          if(da.meta.code=='1'){
           this.fresh.emit(null);
          }
        });
      }
      this.handleCancel(true);
    }
    );
  }

  addTag(){
    if(this.inputTag.length>10){
      this.nzMessage.error('字符不能超过10');
      return;
    }else if(this.tags.length>=3){
      this.nzMessage.error('最多加三个标签');
      return;
    }else if (this.inputTag.length == 0) {
      return;
    }
    for(let item of this.tags){
      if(item.name==this.inputTag){
        this.nzMessage.error('不要重复加标签');
        return;
      }
    }

    this.servic.addTag(this.inputTag).subscribe((da: any)=>{
      if(da.meta.code=='1'){
        let id=da.data.id;
        let name=da.data.name;
        let tagCount=0;
        this.tags.push({id,name,tagCount});
        this.inputTag='';
      }
    });
  }

  handleCancel(isAdd?:boolean): void {
    this.isVisible = false;
    if(isAdd){
      this.showMsgService.refreshList(true);
      this.tagMsgService.freshTags();
    }

  }

  showModal(): void {
    this.isVisible = true;
    this.tags=[];
    this.inputValue='';
    this.inputTag='';
    if (this.user == 1) {
      this.userName = '痞老板';
      this.img = Img.img0;
    } else {
      this.userName = '水友';
      this.img = Img.img1;
    }
  }
}
