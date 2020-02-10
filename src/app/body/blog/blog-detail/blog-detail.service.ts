import { Injectable } from '@angular/core';
import {Url} from "../../../model/url";
import {HttpClient, HttpParams} from "@angular/common/http";

@Injectable()
export class BlogDetailService {
  private url_content=Url.url+"/blog/content";
  constructor(private http: HttpClient) { }
  getContent(id){
    const params=new HttpParams().set("blogId",id.toString());
    return this.http.get(this.url_content,{params,withCredentials: true});
  }
}
