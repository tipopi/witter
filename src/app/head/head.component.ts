import { Component, OnInit,Input } from '@angular/core';
import {LocalStorage} from "../local.storage";

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.css']
})
export class HeadComponent implements OnInit {
  @Input() isLogin: boolean;

  constructor(private local: LocalStorage) {
    local.set('userId','1');
  }

  ngOnInit() {
  }


}
