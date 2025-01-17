import {Injectable} from '@angular/core';
import {HttpParams} from "@angular/common/http";
import {HttpUtilService} from "../../framework/service/http-util.service";

@Injectable()
export class TagsService {
  private url_count = '/tag/findCount';
  private url_delete = '/tag/delete';


  constructor(private http: HttpUtilService) {
  }

  findCount(type: number) {
    const params = new HttpParams().set("type", type.toString());
    return this.http.get(this.url_count, params);
  }

  delete(tagId) {
    const params = new HttpParams().set("tagId", tagId.toString());
    return this.http.get(this.url_delete, params);
  }
}
