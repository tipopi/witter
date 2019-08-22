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
  dele: boolean;
  erro: string='';
  constructor(private service: DetailService,private local: LocalStorage,private cdf: ChangeDetectorRef) {
  }

  ngOnInit() {
    // if (this.userId == 0) {
    //   this.userName = '痞老板';
    //   this.img = Img.img0;
    // } else {
    //   this.userName = '水友';
    //   this.img = Img.img1;
    // }

  }
  addCom(){
    if(this.inputValue.length>255){
      this.erro='字符不能超过255';
      return;
    }else if(this.inputValue.length==0){
      this.erro='不要发空气';
      return;
    }
    let user=this.local.get('userId');
    this.service.addCom(user,this.tweetId,0,this.inputValue).subscribe((da:any) => {
      if (da.meta.code ==1){
        let id=da.data.toString();
        let text=this.inputValue;
        let createTime=new Date().getTime().toString();
        let userId=user.toString();
        this.coms.push({id,userId, text,createTime});
        this.cdf.markForCheck();
        this.cdf.detectChanges();
        this.inputValue='';
      }
    });
  }
  deleteCom(id){
    this.service.deleteCom(id,this.local.get('token')).subscribe((da: any)=>{
      if(da.meta.code==1){
        this.coms=this.coms.filter(item=>item.id!=id);
        this.local.set('token',da.meta.token);
        this.cdf.markForCheck();
        this.cdf.detectChanges();
      }
    })
  }

  handleCancel(): void {
    this.isVisible = false;
  }


  showModal(): void {
    this.dele = this.local.get('userId') == '0';
    this.service.findList(this.tweetId, 0).subscribe((da:any) => {
      this.coms=da.data;
      this.cdf.markForCheck();
      this.cdf.detectChanges();
    });
    this.inputValue='';
    this.erro='';

    if (this.userId == 0) {
      this.userName = '痞老板';
      this.img = Img.img0;
    } else {
      this.userName = '水友';
      this.img = Img.img1;
    }
    this.isVisible = true;
  }

}
