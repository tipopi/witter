import { Injectable } from '@angular/core';
import {  HttpClient } from '@angular/common/http';
import {Url} from '../model/url.ts';
@Injectable()
export class LoginService {
  private add_url=Url.url+'addSession';
  private add_url=Url.url+'deleteSession';

  constructor() { }
  addUser(username:string,password:string){
    let user={
      username:username,
      password:password
    }

  }
}
