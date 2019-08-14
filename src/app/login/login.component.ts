import { Component, OnInit,Input } from '@angular/core';
import {LoginService} from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],
  providers:[LoginService]
})
export class LoginComponent implements OnInit{
  username = '';
  password = '';
  ngOnInit(): void {
  }
  onSubmit(formValue) {
    if (this.username==''||this.password=='') {
      return;
    }
    this.service.addUser(this.username,this.password).subscribe(data=>console.log(data));
  }
  isVisible = false;

  constructor(private service:LoginService) {}

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }


}
