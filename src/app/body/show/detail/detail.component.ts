import {Component, Input, OnInit, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import {Comments} from "../../../model/comment";
import {DetailService} from "./detail.service";
import {Img} from "../../../model/img";
import {LocalStorage} from "../../../local.storage";
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  providers: [DetailService],
  // changeDetection: ChangeDetectionStrategy.OnPush
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
  constructor(private service: DetailService,private local: LocalStorage,private cdf: ChangeDetectorRef) {
  }

  ngOnInit() {
    if (this.userId == 0) {
      this.userName = '痞老板';
      this.img = Img.img0;
    } else {
      this.userName = '水友';
      this.img = Img.img1;
    }

  }
  addCom(){
    this.service.addCom(this.local.get('userId'),this.tweetId,0,this.inputValue).subscribe((da:any) => {
      if (da.meta.code ==1){
        let id=da.data.toString();
        let text=this.inputValue;
        let userid="0";
        let createtime=new Date().getTime().toString();
        this.coms.push({id,userid, text,createtime});
        this.cdf.markForCheck();
        this.cdf.detectChanges();
        this.inputValue='';
      }
    });
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  showModal(): void {
    this.service.findList(this.tweetId, 0).subscribe((da:any) => {
      this.coms=da.data;
      this.cdf.markForCheck();
      this.cdf.detectChanges();
    });
    this.inputValue='';
    this.isVisible = true;
  }

}
