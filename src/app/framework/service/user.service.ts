import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user = new BehaviorSubject<number>(0);
  userObs$ = this.user.asObservable();
  private token = new BehaviorSubject("");
  tokenObs$ = this.token.asObservable();

  constructor() {
  }

  login() {
    this.user.next(1);
  }

  logout() {
    this.user.next(0);
  }

  setToken(token: string) {
    this.token.next(token);
  }
}
