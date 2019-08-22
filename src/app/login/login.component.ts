import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {LoginService} from './login.service';
import {Result} from '../model/result'
import {LocalStorage} from "../local.storage";

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],
  providers:[LoginService]
})
export class LoginComponent implements OnInit{
  username: string = '';
  password :string= '';
  erro: boolean=false;
  msg: string='';
  isVisible = false;
  @Output() login: EventEmitter<number> = new EventEmitter<number>();
  ngOnInit(): void {
  }
  onSubmit(formValue) {
    if (this.username==''||this.password=='') {
      this.erro=true;
      this.msg='账号密码不能为空';
      return;
    }
    this.service.login(this.username,this.password).subscribe((da: any)=>
    {
      if(da.meta.code==1){
        this.isVisible = false;
        this.local.set('userId','0');
        this.local.set('token',da.meta.token);
        console.log(da.meta.token);
        this.login.emit(null);
      }
      else {
        this.erro=true;
        this.msg=da.meta.message;
      }
    });


  }



  constructor(private service:LoginService,private local: LocalStorage) {}

  showModal(): void {
    this.username='';
    this.password='';
    this.isVisible = true;
  }


  handleCancel(): void {
    this.isVisible = false;
  }


}
