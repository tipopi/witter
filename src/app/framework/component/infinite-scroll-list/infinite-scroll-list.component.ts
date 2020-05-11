import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {BehaviorSubject, fromEvent, merge, of, Subject} from 'rxjs';
import {debounceTime, delay, distinct, filter, map, mergeMap, tap} from 'rxjs/operators';
import {InfiniteScrollService} from '../../service/infinite-scroll.service';

@Component({
  selector: 'app-infinite-scroll-list',
  templateUrl: './infinite-scroll-list.component.html',
  styleUrls: ['./infinite-scroll-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfiniteScrollListComponent implements OnInit {
  @Input() template: any;
  @Input() option: {
    handle: any,
    style: any,
    itemHeight: number,
    itemNumber: number,
    pageInit: any
  }
  item$ = new Subject();
  itemResults$;
  private cache = [];
  private page = 1;
  private itemNumber;
  private heghit;
  private itemHeight;
  private pageByManual$ = new BehaviorSubject(1);
  private pageByScroll$;
  private pageByResize$;
  private pageToLoad$;
  private disClear$ = new BehaviorSubject(1);

  constructor(private service: InfiniteScrollService) {
  }

  scrollDataSource(page: number, handle: any) {
    return handle(page);
  };

  ngOnInit() {

    this.heghit = this.option.style.height ? Number(this.option.style.height.replace('px', '')) : 200;
    this.itemHeight = this.option.itemHeight ? this.option.itemHeight : 20;
    this.itemNumber = this.option.itemNumber ? this.option.itemNumber : 10;

  }

  // ngOnInit() {
  //     fromEvent(document.querySelector('#btn'),'click').subscribe(_=>{
  //        console.log('ok');
  //        this.item$.next([]);
  //      });
  // }
  pageInit() {
    this.pageByManual$.next(1);
    this.pageByManual$.next(this.option.pageInit ? this.option.pageInit : 2);
  }

  ngAfterViewInit(): void {
    let dom = document.querySelector('#scr');
    this.pageByScroll$ = fromEvent(dom, "scroll").pipe(
      map(() => document.querySelector('#scr').scrollTop),
      debounceTime(100),
      map(y => Math.ceil((y + this.heghit * 1.2) / (this.itemHeight * this.itemNumber))),
      distinct(null, this.disClear$)
    );
    this.pageByResize$ = fromEvent(dom, "resize").pipe(
      debounceTime(200),
      map(_ => Math.ceil(
        (this.heghit + dom.scrollTop) /
        (this.itemHeight * this.itemNumber)
      ))
    );
    this.pageToLoad$ = merge(this.pageByManual$, this.pageByScroll$, this.pageByResize$).pipe(
      distinct(null, this.disClear$),
      filter(page => this.cache[page - 1] === undefined)
    );
    this.itemResults$ = this.pageToLoad$.pipe(
      mergeMap((page: number) => {
        let last = this.page;
        if (page - last > 1) {
          let arry = [];
          for (let i = last + 1; i <= page; i++) {
            arry.push(i);
          }
          return of(...arry);
        } else {
          return of(page);
        }

      }),
      mergeMap((page: number) => {
        return this.scrollDataSource(page, this.option.handle).pipe(
          tap(resp => {
            this.page = page;
            this.cache[page - 1] = resp;
          }));
      }),
      delay(0)
    );
    this.itemResults$.subscribe(_ => this.item$.next([].concat(...this.cache)));
    this.pageInit();
    this.service.refresh$.subscribe(handle => {
      if (handle) {
        this.option.handle = handle;
      }
      this.page = 1;
      this.cache = [];
      this.item$.next([]);
      this.disClear$.next(1);
      this.pageInit();
    });
  }
}
