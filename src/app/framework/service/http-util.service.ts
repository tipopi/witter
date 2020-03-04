import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from "rxjs";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class HttpUtilService {
  token;
  constructor(private http: HttpClient,private userService:UserService) {
    userService.tokenObs$.subscribe(token=>{
      this.token=token;
    })
  }
  get<T>(url:string, params: HttpParams, token?: string): Observable<T> {
    let headers: HttpHeaders = new HttpHeaders({
      'Content-type': 'application/json',
      'X-Token': token?token:this.token
    });
    return this.http.get<T>(url, {
      params: params,
      headers: headers,
      withCredentials: true
    });
  }
  delete<T>(url:string, params: HttpParams, token?: string): Observable<T> {
    let headers: HttpHeaders = new HttpHeaders({
      'Content-type': 'application/json',
      'X-Token': token?token:this.token
    });
    return this.http.delete<T>(url, {
      params: params,
      headers: headers,
      withCredentials: true
    });
  }

  post<T>(url:string,body: any | null, params?: HttpParams, token?: string): Observable<T> {
    let headers: HttpHeaders = new HttpHeaders({
      'Content-type': 'application/json',
      'X-Token': token?token:this.token
    });
    return this.http.post<T>(url,body, {
      params,
      headers,
      withCredentials: true
    });
  }
  put<T>(url:string,body: any | null ,params?: HttpParams, token?: string): Observable<T> {
    let headers: HttpHeaders = new HttpHeaders({
      'Content-type': 'application/json',
      'X-Token': token?token:this.token
    });
    return this.http.put<T>(url,body, {
      params,
      headers,
      withCredentials: true
    });
  }
}
