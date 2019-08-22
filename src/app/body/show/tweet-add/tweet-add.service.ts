import { Injectable } from '@angular/core';
import {HttpClient,HttpParams} from "@angular/common/http";
import {Url} from "../../../model/url";

@Injectable()
export class TweetAddService {
  private url_add = Url.url + '/tweet/addTweet';
  private url_add_tag = Url.url + '/tag/add';
  private url_tag_map=Url.url+'/tag/addMap';
  constructor(private http: HttpClient) { }

  addTweet(userId,text){
    return this.http.post(this.url_add,
      {
        userId,text
      }
    ,{withCredentials: true});
  }
  addMap(href,tags){
    let type='0';
    return this.http.post(this.url_tag_map,{href,tags,type},{withCredentials: true});
  }
  addTag(name){
    return this.http.post(this.url_add_tag,{name},{withCredentials: true});
  }

}
