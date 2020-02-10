import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Url} from "../../../../model/url";

@Injectable()
export class BlogAddService {
  private url_content=Url.url+"/blog/content";
  private url_add = Url.url + "/blog/add";
  private url_up = Url.url + "/blog/update";
  constructor(private http: HttpClient) { }
  getContent(id){
    const params=new HttpParams().set("blogId",id.toString());
    return this.http.get(this.url_content,{params,withCredentials: true});
  }
  addBlog(blog){
    return this.http.post(this.url_add,blog,{withCredentials: true});
  }
  updateBlog(blog){
    return this.http.put(this.url_up,blog,{withCredentials: true});
  }
}
