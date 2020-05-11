import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Url} from '../model/url';
import {HttpUtilService} from "../framework/service/http-util.service";

@Injectable()
export class LoginService {
  private add_url ='/addSession';
  private delete_url ='/deleteSession';

  constructor(private http: HttpUtilService) {
  }


  login(username: string, password: string) {
    const user = {
      username,
      password
    };

    return this.http.post(this.add_url, user);
  }

  logout() {
    return this.http.get(this.delete_url);
  }
}

