import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {Comments} from "../../../model/comment";
import {DetailService} from "./detail.service";
import {Img} from "../../../model/img";
import {UserService} from "../../../framework/service/user.service";

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
  img0 = Img.img0;
  img1 = Img.img1;
  inputValue: string;
  erro: string = '';
  user: number;

  constructor(private service: DetailService, private userService: UserService, private cdf: ChangeDetectorRef) {
    this.userService.userObs$.subscribe(status => this.user = status);
  }

  ngOnInit() {

  }

  addCom() {
    if (this.inputValue.length > 255) {
      this.erro = '字符不能超过255';
      return;
    } else if (this.inputValue.length == 0) {
      this.erro = '不要发空气';
      return;
    }
    this.service.addCom(this.user, this.tweetId, 0, this.inputValue).subscribe((da: any) => {
      if (da !== []) {
        let id = da.data.toString();
        let text = this.inputValue;
        let createTime = new Date().getTime().toString();
        let userId = this.user.toString();
        this.coms.push({id, userId, text, createTime});
        this.cdf.markForCheck();
        this.cdf.detectChanges();
        this.inputValue = '';
      } else {
        this.erro = "服务器错误";
      }
    });
  }

  deleteCom(id) {
    this.service.deleteCom(id).subscribe((da: any) => {
      if (da.meta.code == 1) {
        this.coms = this.coms.filter(item => item.id != id);
        this.cdf.markForCheck();
        this.cdf.detectChanges();
      }
    })
  }

  handleCancel(): void {
    this.isVisible = false;
  }


  showModal(): void {
    this.service.findList(this.tweetId, 0).subscribe((da: any) => {
      this.coms = da.data;
      this.cdf.markForCheck();
      this.cdf.detectChanges();
    });
    this.inputValue = '';
    this.erro = '';

    if (this.userId == 1) {
      this.userName = '痞老板';
      this.img = Img.img0;
    } else {
      this.userName = '游客';
      this.img = Img.img1;
    }
    this.isVisible = true;
  }

}
