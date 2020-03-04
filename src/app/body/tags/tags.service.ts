import { Injectable } from '@angular/core';
import {Url} from "../../model/url";
import {HttpParams} from "@angular/common/http";
import {HttpClient} from "@angular/common/http";
import { BehaviorSubject, Subject } from 'rxjs';
import {HttpUtilService} from "../../framework/service/http-util.service";

@Injectable()
export class TagsService {
  private url_count = Url.url + '/tag/findCount';
  private url_delete = Url.url + '/tag/delete';


  constructor(private http: HttpUtilService) {}

  findCount(type:number){
    const params=new HttpParams().set("type",type.toString());
    return this.http.get(this.url_count,params);
  }

  delete(tagId){
    const params=new HttpParams().set("tagId",tagId.toString());
    return this.http.get(this.url_delete, params);
  }
}
