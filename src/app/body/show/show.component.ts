import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
import {TagsService} from '../tags/tags.service';
import {DateService} from "../date/date.service";
import {InfiniteScrollRunService} from "../../framework/service/infinite-scroll-run.service";
import {TagMsgService} from "../tags/tag-msg.service";
import { ShowMsgService } from './show-msg.service';


@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css'],
  providers:[TagMsgService,DateService,InfiniteScrollRunService,ShowMsgService]
})
export class ShowComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }
}
