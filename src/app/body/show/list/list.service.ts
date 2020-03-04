import { Injectable } from '@angular/core';
import {  HttpClient } from '@angular/common/http';
import {Url} from '../../../model/url';
import {HttpParams} from "@angular/common/http";
import {HttpHeaders} from "@angular/common/http";
import {HttpUtilService} from "../../../framework/service/http-util.service";
@Injectable()
export class ListService {
  private url_all = Url.url + '/tweet/findList';
  private url_by_tag = Url.url + '/tweet/findByTag';
  private url_power = Url.url + '/tweet/addPower';
  private url_delete = Url.url + '/tweet/delete';
  constructor(private http: HttpUtilService) { }

  findAll(tag: string,date: Date){
    if(tag=="all"){
      const params=new HttpParams().set("time",date.valueOf().toString());
      return this.http.get(this.url_all,params);
    }
    else {
      const params=new HttpParams()
        .set("time",date.valueOf().toString())
        .set("tagId",tag);
      return this.http.get(this.url_by_tag,params);
    }
  }
  addPower(id,power){
    return this.http.put(this.url_power,{id,power});
  }
  deleteTweet(id,token){
    return this.http.delete(this.url_delete,new HttpParams().set("id", id));
  }
}
