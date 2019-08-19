import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Url} from "../../../model/url";

@Injectable()
export class DetailService {
  private url_list = Url.url + '/comment/findList'
  private url_add = Url.url + '/comment/add';

  constructor(private http: HttpClient) {
  }

  findList(tweetId, type) {
    const params = new HttpParams().set("href", tweetId).set("type", type);
    return this.http.get(this.url_list, {params});
  }

  addCom(userId, href, type, text) {
    return this.http.post(this.url_add,
    {
      userId, href, text, type
    }
  )
    ;
  }

}
