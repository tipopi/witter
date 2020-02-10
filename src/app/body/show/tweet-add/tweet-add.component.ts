import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {Img} from "../../../model/img";
import {TweetAddService} from "./tweet-add.service";
import {LocalStorage} from "../../../local.storage";
import {Tag} from "../../../model/tag";
import {UserService} from "../../../framework/service/user.service";

@Component({
  selector: 'app-tweet-add',
  templateUrl: './tweet-add.component.html',
  styleUrls: ['./tweet-add.component.css'],
  providers: [TweetAddService]
})
export class TweetAddComponent implements OnInit {
  isVisible: boolean;
  img;
  userName;
  inputValue: string;
  inputTag: string;
  tags: Tag[]=[];
  @Output() fresh: EventEmitter<null> = new EventEmitter<null>();
  erro: string='';
  user:number;
  constructor(private servic: TweetAddService,private userService:UserService) {
    this.userService.userObs$.subscribe(user=>this.user=user);
  }

  ngOnInit() {

  }

  addTweet(){
    if(this.inputValue.length>255){
      this.erro='字符不能超过255';
      return;
    }else if(this.inputValue.length==0){
      this.erro='不要发空气';
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
      this.isVisible=false;
    }
    );
  }

  addTag(){
    if(this.inputTag.length>10){
      this.erro='字符不能超过10';
      return;
    }else if(this.tags.length>=3){
      this.erro='最多加三个标签';
      return;
    }
    for(let item of this.tags){
      if(item.name==this.inputTag){
        this.erro='不要重复加标签';
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

  handleCancel(): void {
    this.isVisible = false;
  }

  showModal(): void {
    this.isVisible = true;
    this.tags=[];
    this.inputValue='';
    this.inputTag='';
    this.erro='';
    if (this.user == 1) {
      this.userName = '痞老板';
      this.img = Img.img0;
    } else {
      this.userName = '水友';
      this.img = Img.img1;
    }
  }
}
