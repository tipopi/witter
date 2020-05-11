import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {HttpUtilService} from "../../../framework/service/http-util.service";

@Injectable()
export class DetailService {
  private url_list = '/comment/find'
  private url_add = '/comment/add';
  private url_delete = '/comment/delete';

  constructor(private http: HttpUtilService) {
  }

  findList(tweetId, type) {
    const params = new HttpParams().set("href", tweetId).set("type", type);
    return this.http.get(this.url_list, params);
  }

  addCom(userId, href, type, text) {
    return this.http.post(this.url_add,
      {
        userId, href, text, type
      });
  }

  deleteCom(id) {
    return this.http.delete(this.url_delete, new HttpParams().set("id", id));
  }

}
