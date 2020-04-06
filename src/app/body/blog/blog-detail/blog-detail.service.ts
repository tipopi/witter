import { Injectable } from '@angular/core';
import {Url} from "../../../model/url";
import {HttpClient, HttpParams} from "@angular/common/http";
import {HttpUtilService} from "../../../framework/service/http-util.service";

@Injectable()
export class BlogDetailService {
  private url_content="/blog/content";
  private url_addBrowse="/blog/addBrowse";
  constructor(private http: HttpUtilService) { }
  getContent(id){
    const params=new HttpParams().set("blogId",id.toString());
    return this.http.get(this.url_content,params);
  }
  addBrowse(blogId){
    const params=new HttpParams().set("blogId",blogId.toString());
    return this.http.get(this.url_addBrowse,params);
  }
}
