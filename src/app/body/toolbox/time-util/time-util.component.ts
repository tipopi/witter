import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-time-util',
  templateUrl: './time-util.component.html',
  styleUrls: ['./time-util.component.css']
})
export class TimeUtilComponent implements OnInit {
  now: Date = new Date();
  tr;
  tr2;
  intervalId = 0;
  isRun = true;
  st2;

  constructor() {
  }

  ngOnInit() {
    this.startTimer();
  }

  ngOnDestroy() {
    this.clearTimer();
  }

  turn(time: string) {
    this.tr = new Date(time).getTime();
  }

  turn2(time) {
    this.tr2 = new Date(Number.parseInt(time));
  }

  startTimer() {
    this.intervalId = setInterval(() => this.now = new Date(), 1000);
    this.isRun = true;
  }

  clearTimer() {
    clearInterval(this.intervalId);
    this.isRun = false;
  }
}
