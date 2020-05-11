import {Component, OnInit, ViewChild} from '@angular/core';
import {InfiniteScrollRunService} from "../../../framework/service/infinite-scroll-run.service";
import {ListService} from "../list/list.service";
import {Img} from "../../../model/img";
import {map} from 'rxjs/operators';
import {ScrollListService} from "./scroll-list.service";
import {UserService} from "../../../framework/service/user.service";
import {DateService} from "../../date/date.service";
import {TagMsgService} from "../../tags/tag-msg.service";
import {ShowMsgService} from '../show-msg.service';
import {NzMessageService} from "ng-zorro-antd";

@Component({
  selector: 'app-scroll-list',
  templateUrl: './scroll-list.component.html',
  styleUrls: ['./scroll-list.component.css'],
  providers: [ListService]
})
export class ScrollListComponent implements OnInit {
  @ViewChild('src', {static: false})
  myTemplate: any;
  item$;
  img0: string = Img.img0;
  img1: string = Img.img1;
  date: Date = this.setDate();
  tag: string = "all";
  isPi: boolean = false;
  token;

  constructor(private scrollService: InfiniteScrollRunService,
              private service: ScrollListService,
              private userService: UserService,
              private tagsService: TagMsgService,
              private dateService: DateService,
              private showMsgService: ShowMsgService,
              private nzMessageService: NzMessageService
  ) {
    this.showMsgService.refreshList$.subscribe((save: boolean) => {
      this.scrollService.refreshData(this.handle, save);
    });
    this.userService.tokenObs$.subscribe(token => {
      this.token = token
    });
    this.tagsService.tagObs$.subscribe((tag: string) => {
      this.tag = tag;
      this.scrollService.refreshData(this.handle);
    });
    this.dateService.dateObs$.subscribe((date: Date) => {
      this.date = date;
      this.scrollService.refreshData(this.handle);
    });
    this.userService.userObs$.subscribe(status => this.isPi = status == 1 ? true : false);
  }

  handle = page => {
    return this.service.findAll(this.tag, this.date, page).pipe(
      map((item: any) => {
        if (item.meta.code === 1) {
          return item.data;
        }
        return [];
      }))
  }

  option = {
    handle: this.handle,
    itemNumber: 8,
    itemHeight: 100,
    style: {
      height: '800px',
      width: '1200px'
    },
    pageInit: 2
  }

  setDate() {
    //获取下一天日期
    let date = new Date();
    date = new Date(date.setDate(date.getDate() + 1));
    return date;
  }

  ngAfterViewInit(): void {
    this.item$ = this.scrollService.init(this.option, this.myTemplate);
  }

  addPower(id, power) {
    this.service.addPower(id, power).subscribe();
  }

  deleteTweet(id) {
    this.service.deleteTweet(id, this.token).subscribe((da: any) => {
      if (da.meta.code == 1) {
        this.nzMessageService.info("删除成功");
        this.userService.setToken(da.meta.token);
        this.tagsService.freshTags();
        this.scrollService.refreshData(this.handle, true);
      } else {
        this.nzMessageService.error("删除失败，系统错误");
      }
    });
  }

  ngOnInit() {
  }

}
