import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {HttpUtilService} from "../../../framework/service/http-util.service";

@Injectable({
  providedIn: 'root'
})
export class BlogListService {
  private url_list = '/blog/findList';
  private url_delete = '/blog/delete';

  constructor(private http: HttpUtilService) {
  }

  findList(tag: string, date: Date, page: number) {
    const params = new HttpParams()
      .set("time", date.valueOf().toString())
      .set("tagId", tag)
      .set("page", page.toString());
    return this.http.get(this.url_list, params);
  }

  deleteBlog(blogId, token) {
    return this.http.delete(this.url_delete, new HttpParams().set("blogId", blogId));
  }


}
