import { Injectable } from '@angular/core';
import {Url} from "../../../model/url";
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ScrollListService {
  private url_all = Url.url + '/tweet/findList';
  private url_by_tag = Url.url + '/tweet/findByTag';
  private url_power = Url.url + '/tweet/addPower';
  private url_delete = Url.url + '/tweet/delete';
  constructor(private http: HttpClient) { }
  findAll(tag: string,date: Date,page:number){
    if(tag=="all"){
      const params=new HttpParams()
        .set("time",date.valueOf().toString())
        .set("page",page.toString());
      return this.http.get(this.url_all,{params,withCredentials: true});
    }
    else {
      const params=new HttpParams()
        .set("time",date.valueOf().toString())
        .set("tagId",tag)
        .set("page",page.toString());;
      return this.http.get(this.url_by_tag,{params,withCredentials: true});
    }
  }
  addPower(id,power){
    return this.http.put(this.url_power,{id,power},{withCredentials: true});
  }
  deleteTweet(id,token){
    const httpOption={
      headers: new HttpHeaders({
        'X-Token': token
      }),
      params : new HttpParams().set("id", id),
      withCredentials: true
    };
    return this.http.delete(this.url_delete,httpOption);
  }
}
