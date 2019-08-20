import { Component, OnInit } from '@angular/core';
import {Img} from "../../../model/img";
import {TweetAddService} from "./tweet-add.service";
import {LocalStorage} from "../../../local.storage";
import {Tag} from "../../../model/tag";
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
  constructor(private servic: TweetAddService,private local: LocalStorage) { }

  ngOnInit() {

  }

  addTweet(){
    this.servic.addTweet(this.local.get('userId'),this.inputValue).subscribe((da: any)=>{
      if(da.meta.code=='1'&&this.tags.length!=0){
        let id=da.data;
        let tags=[];
        this.tags.forEach(item=>tags.push(item.id));
        this.servic.addMap(id,tags)._subscribe((da: any)=>{
        });
      }
      this.isVisible=false;
    });
  }
  //TODO 校验
  addTag(){
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
    if (this.local.get('userId') == '0') {
      this.userName = '痞老板';
      this.img = Img.img0;
    } else {
      this.userName = '水友';
      this.img = Img.img1;
    }
  }
}
