import { Injectable } from '@angular/core';
import {HttpClient,HttpParams} from "@angular/common/http";
import {Url} from "../../../model/url";
import {HttpUtilService} from "../../../framework/service/http-util.service";

@Injectable()
export class TweetAddService {
  private url_add = Url.url + '/tweet/addTweet';
  private url_add_tag = Url.url + '/tag/add';
  private url_tag_map=Url.url+'/tag/addMap';
  constructor(private http: HttpUtilService) { }

  addTweet(userId,text){
    return this.http.post(this.url_add,
      {
        userId,text
      });
  }
  addMap(href,tags){
    let type='0';
    return this.http.post(this.url_tag_map,{href,tags,type});
  }
  addTag(name){
    let type='0';
    return this.http.post(this.url_add_tag,{name,type});
  }

}
