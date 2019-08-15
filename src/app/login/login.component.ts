import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {LoginService} from './login.service';
import {Result} from '../model/result'

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
  @Output() login: EventEmitter<number> = new EventEmitter<number>();
  ngOnInit(): void {
  }
  onSubmit(formValue) {
    if (this.username==''||this.password=='') {
      return;
    }
    this.service.login(this.username,this.password).subscribe(da=>
    {
      if(da.meta.code==1){
        this.isVisible = false;
        this.login.emit(null);
      }
      else {
        this.erro=true;
        this.msg=da.meta.msg;
      }
    });


  }
  isVisible = false;

  constructor(private service:LoginService) {}

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }


}
