import {Component, OnInit} from '@angular/core';
import {DateService} from './date.service';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.css']
})
export class DateComponent implements OnInit {

  constructor(private service: DateService) {
  }

  ngOnInit() {
  }

  onChange(result: Date): void {
    this.service.setDate(result);
  }
}
