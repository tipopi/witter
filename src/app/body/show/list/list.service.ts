import { Injectable } from '@angular/core';
import {  HttpClient } from '@angular/common/http';
import {Url} from '../../../model/url';
import {HttpParams} from "@angular/common/http";
@Injectable()
export class ListService {
  private url_all = Url.url + '/tweet/findList';

  constructor(private http: HttpClient) { }

  findAll(date: Date){
    const params=new HttpParams().set("time",date.valueOf().toString());
    return this.http.get(this.url_all,{params});
  }

}
