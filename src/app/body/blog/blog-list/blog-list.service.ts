import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import {Url} from "../../../model/url";

@Injectable({
  providedIn: 'root'
})
export class BlogListService {
  private url_list= Url.url + '/blog/findList';
  constructor(private http: HttpClient) { }
  findList(tag:string,date:Date,page:number){
    const params=new HttpParams()
      .set("time",date.valueOf().toString())
      .set("tagId",tag)
      .set("page",page.toString());
    return this.http.get(this.url_list,{params,withCredentials: true});
  }
}
