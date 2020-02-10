import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user=new BehaviorSubject(0);
  private token=new BehaviorSubject("");
  userObs$=this.user.asObservable();
  tokenObs$=this.token.asObservable();
  constructor() { }
  login(){
    this.user.next(1);
  }
  logout(){
    this.user.next(0);
  }
  setToken(token:string){
    this.token.next(token);
  }
}
