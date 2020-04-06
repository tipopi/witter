import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from "rxjs";
import {UserService} from "./user.service";
import { catchError, tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpUtilService {
  token;
  host = 'http://localhost:8080';
  constructor(private http: HttpClient,private userService:UserService) {
    userService.tokenObs$.subscribe(token=>{
      this.token=token;
    })
  }
  private httpCall<T>() {
    return (real: Observable<T | any>) => {
      return real.pipe(
        tap(res=>{
          if(res.meta.token){
            this.userService.setToken(res.meta.token);
          }
        }),
        map(res=>{
          if(res.meta.code==1){
            return res;
          }else{
            //error handle
            return undefined;
          }
        })
      );
    };
  }
  setOption(params:HttpParams,token?:string,header?:HttpHeaders){
    let headers: HttpHeaders = new HttpHeaders({
      'Content-type': 'application/json',
      'X-Token': token?token:this.token,
      ...header
    });
    return {
      params,
      headers,
      withCredentials: true
    }
  }
  setUrl(end:string){
    return this.host+end;
  }
  get<T>(end:string, params: HttpParams, token?: string): Observable<T> {
    return this.httpCall()(this.http.get<T>(this.setUrl(end), this.setOption(params,token)));
  }
  delete<T>(end:string, params: HttpParams, token?: string): Observable<T> {
    return this.httpCall()(this.http.delete<T>(this.setUrl(end), this.setOption(params,token)));
  }

  post<T>(end:string,body: any | null, params?: HttpParams, token?: string): Observable<T> {
    return this.httpCall()(this.http.post<T>(this.setUrl(end),body, this.setOption(params,token)));
  }
  post_up<T>(url:string,body: any | null, params?: HttpParams, token?: string): Observable<T> {
    return this.http.post<T>(url,body, {
      params
    });
  }
  put<T>(end:string,body: any | null ,params?: HttpParams, token?: string): Observable<T> {
    return this.httpCall()(this.http.put<T>(this.setUrl(end),body, this.setOption(params,token)));
  }
}
