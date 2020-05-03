import {Injectable} from '@angular/core';
import {HttpUtilService} from "../../../../framework/service/http-util.service";
import {Observable, Subject} from 'rxjs';

@Injectable()
export class BlogAddService {
  private url_up_file = "http://up-z2.qiniup.com";
  private url_add = "/blog/add";
  private url_up = "/blog/update";
  private url_token = "/picToken";
  private imgSouce = new Subject<string>();
  imgObs$ = this.imgSouce.asObservable();

  constructor(private http: HttpUtilService) {
  }

  putImg(imgKey: string) {
    this.imgSouce.next(imgKey);
  }

  upload(file: File, token: string): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('key', file.name);
    formData.append('token', token);
    return this.http.post_up(this.url_up_file, formData);
  }

  getToken(): Observable<any> {
    return this.http.get(this.url_token, null);
  }

  addBlog(blog, token) {
    return this.http.post(this.url_add, blog);
  }

  updateBlog(blog) {
    return this.http.put(this.url_up, blog);
  }
}
