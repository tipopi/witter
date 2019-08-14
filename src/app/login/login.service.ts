import { Injectable } from '@angular/core';
import {  HttpClient } from '@angular/common/http';
import {Url} from '../model/url';
import { Observable } from 'rxjs';
@Injectable()
export class LoginService {
  private add_url = Url.url + '/addSession';
  private delete_url = Url.url + '/deleteSession';

  constructor(private http: HttpClient) { }

  // @ts-ignore
  addUser(username: string, password: string) :Observable{
    const user = {
      username,
      password
    };
    return this.http.post(this.add_url,user)
  }
}
