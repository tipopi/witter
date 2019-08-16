import { Injectable } from '@angular/core';
import {  HttpClient } from '@angular/common/http';
import {Url} from '../model/url';

@Injectable()
export class LoginService {
  private add_url = Url.url + '/addSession';
  private delete_url = Url.url + '/deleteSession';

  constructor(private http: HttpClient) { }


  login(username: string, password: string){
    const user = {
      username,
      password
    };

    return this.http.post(this.add_url,user);
    }

  }

