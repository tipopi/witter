import {Component, Input, OnInit} from '@angular/core';
import {Comments} from "../../../model/comment";
import {DetailService} from "./detail.service";
import {Img} from "../../../model/img";
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  providers: [DetailService]
})
export class DetailComponent implements OnInit {
  isVisible: boolean;
  @Input() userId: number;
  @Input() text: string;
  @Input() tweetId: number;
  @Input() createTime: string;
  img: string;
  userName: string;
  coms: Comments[] = [];
  img0=Img.img0;
  img1=Img.img1;
  inputValue: string;
  constructor(private service: DetailService) {
  }

  ngOnInit() {
    if (this.userId == 0) {
      this.userName = '痞老板';
      this.img = Img.img0;
    } else {
      this.userName = '水友';
      this.img = Img.img1;
    }
    this.text = "十大大苏打大苏打上，dcccccccccccccccccccccccccccccc";
    this.createTime = "2019";
    this.service.findList(this.tweetId, 0).subscribe((da:any) => {
        if (da.data.length != 0) {
          da.data.forEach(item => {
            this.coms.push(item);
          });
        }
      }
    )
  }
  addCom(){
    this.service.addCom(0,this.tweetId,this.inputValue,0).subscribe((da:any) => {
      if (da.code ==1){
        let id=da.data.toString();
        let text=this.inputValue;
        let userid="0";
        let createtime=new Date().getTime().toString();
        this.coms.push({id,userid, text,createtime});
      }
    })
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  showModal(): void {
    this.isVisible = true;
  }

}
