import {Component, OnInit, Input, ViewChild, Output, EventEmitter} from '@angular/core';
import {LocalStorage} from "../local.storage";
import {Img} from "../model/img";
import {LoginService} from "../login/login.service";
import {MsgService} from "../framework/service/msg.service";
import {UserService} from "../framework/service/user.service";
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
  constructor(private local: LocalStorage,private  service: LoginService,private msg: MsgService,private userService:UserService) {
    this.userService.userObs$.subscribe(status=>{
      if(status==1){
        this.isLogin=true;
      }else {
        this.isLogin=false;
      }
      this.msg.headFresh();
    })
  }



  logout(){
    this.visible = false;
    this.userService.logout();
    this.userService.setToken("");
    this.service.logout().subscribe();
  }


  ngOnInit() {
  }


}
