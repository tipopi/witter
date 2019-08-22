import {Component, OnInit, Input, ViewChild, Output, EventEmitter} from '@angular/core';
import {LocalStorage} from "../local.storage";
import {Img} from "../model/img";
import {LoginService} from "../login/login.service";
import {MsgService} from "../msg.service";
@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.css'],
  providers:[LoginService]
})
export class HeadComponent implements OnInit {
  isLogin: boolean = false;
  img=Img.img0;
  visible: boolean;
  constructor(private local: LocalStorage,private  service: LoginService,private msg: MsgService) {
    local.set('userId','1');
  }


  clickMe(): void {
    this.visible = false;
    this.isLogin=false;
    this.local.set('userId','1');
    this.local.set('token','');
    this.logout();
    this.msg.headFresh();
  }
  logout(){
    this.service.logout().subscribe();
  }
  login(){
    this.isLogin=true;
    this.local.set('userId','0');
    this.msg.headFresh();
  }

  ngOnInit() {
  }


}
