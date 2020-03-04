import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Url} from "../../../../model/url";
import {HttpUtilService} from "../../../../framework/service/http-util.service";

@Injectable()
export class BlogAddService {
  private url_content=Url.url+"/blog/test";
  private url_add = Url.url + "/blog/add";
  private url_up = Url.url + "/blog/update";
  private url_token = Url.url + "/picToken";
  constructor(private http:HttpUtilService) { }
  getContent(id){
    this.getToken().subscribe();
    return this.http.get(this.url_content,null);
  }
  getToken(){
    return this.http.get(this.url_token, null);
  }
  addBlog(blog,token){
    return this.http.post(this.url_add,blog);
  }
  updateBlog(blog){
    return this.http.put(this.url_up,blog);
  }
}
