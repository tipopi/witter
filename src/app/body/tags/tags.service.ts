import { Injectable } from '@angular/core';
import {Url} from "../../model/url";
import {HttpParams} from "@angular/common/http";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class TagsService {
  private url_count = Url.url + '/tag/findCount';

  constructor(private http: HttpClient) {}

  findCount(type:number){
    const params=new HttpParams().set("type",type.toString());
    return this.http.get(this.url_count,{params});
  }
}
