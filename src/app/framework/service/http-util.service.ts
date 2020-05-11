import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, of} from "rxjs";
import {UserService} from "./user.service";
import {catchError, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpUtilService {
  token;
  host = 'http://192.168.0.107:8080';

  constructor(private http: HttpClient, private userService: UserService) {
    userService.tokenObs$.subscribe(token => {
      this.token = token;
    })
  }

  setOption(params: HttpParams, token?: string, header?: HttpHeaders) {
    let headers: HttpHeaders = new HttpHeaders({
      'Content-type': 'application/json',
      'X-Token': token ? token : this.token,
      ...header
    });
    return {
      params,
      headers,
      withCredentials: true
    }
  }

  setUrl(end: string) {
    return this.host + end;
  }

  get<T>(end: string, params?: HttpParams, token?: string): Observable<T> {
    return this.httpCall()(this.http.get<T>(this.setUrl(end), this.setOption(params, token)));
  }

  get_3pl<T>(url: string): Observable<T> {
    return this.http.jsonp<T>(url, 'callback');
  }

  delete<T>(end: string, params: HttpParams, token?: string): Observable<T> {
    return this.httpCall()(this.http.delete<T>(this.setUrl(end), this.setOption(params, token)));
  }

  post<T>(end: string, body: any | null, params?: HttpParams, token?: string): Observable<T> {
    return this.httpCall()(this.http.post<T>(this.setUrl(end), body, this.setOption(params, token)));
  }

  post_up<T>(url: string, body: any | null, params?: HttpParams, token?: string): Observable<T> {
    return this.http.post<T>(url, body, {
      params
    });
  }

  put<T>(end: string, body: any | null, params?: HttpParams, token?: string): Observable<T> {
    return this.httpCall()(this.http.put<T>(this.setUrl(end), body, this.setOption(params, token)));
  }

  private httpCall<T>() {
    return (real: Observable<T | any>) => {
      return real.pipe(
        tap(res => {
          if (res.meta.token) {
            this.userService.setToken(res.meta.token);
          }
        }),
        // map(res=>{
        //   return res.data;
        // }),
        catchError(err => {
          if (err.status !== 200) {
            console.log(err);
            return of([]);
          }
        })
      );
    };
  }
}
