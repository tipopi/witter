import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DateService {
  private dateSource = new Subject();
  dateObs$ = this.dateSource.asObservable();

  constructor() {
  }

  setDate(date: Date) {
    this.dateSource.next(date);
  }
}
