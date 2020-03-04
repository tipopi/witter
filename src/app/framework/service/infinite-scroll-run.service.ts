import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, fromEvent, merge, of, Observable } from 'rxjs';
import { map, debounceTime, distinct, filter, mergeMap, tap, delay, concatMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InfiniteScrollRunService {
  private cache=[];
  private page=1;
  private itemNumber;
  private heghit;
  private itemHeight;
  private pageByManual$ = new BehaviorSubject(1);
  private pageByScroll$;
  private pageByResize$;
  private pageToLoad$;
  private disClear$=new BehaviorSubject(1);
  private refreshSource=new Subject();
  refresh$=this.refreshSource.asObservable();
  itemResults$;
  item$=new Subject();
  option:{
    handle:any,
    style:any,
    itemHeight:number,
    itemNumber:number,
    pageInit:any
  }
  dom:Element;
  constructor() {}
  optionSet(option:any){
    this.option=option;
    this.heghit=this.option.style.height?Number(this.option.style.height.replace('px','')):200;
    this.itemHeight=this.option.itemHeight?this.option.itemHeight:20;
    this.itemNumber=this.option.itemNumber?this.option.itemNumber:10;
  }
  //同时段页面中有多个无限列表需要指定dom
  init(option:any,src?:HTMLTemplateElement): Observable<any>{
    this.optionSet(option);
    let dom=src?src:document.querySelector('#scr');
    this.dom=dom;
    this.pageByScroll$= fromEvent(dom, "scroll").pipe(
      map(() => document.querySelector('#scr').scrollTop),
      debounceTime(100),
      map(y => Math.ceil((y + this.heghit*1.2) / (this.itemHeight * this.itemNumber))),
      distinct(null,this.disClear$)
    );
    this.pageByResize$ = fromEvent(dom, "resize").pipe(
      debounceTime(200),
      map(_ => Math.ceil(
        (this.heghit + dom.scrollTop) /
        (this.itemHeight * this.itemNumber)
      ))
    );
    this.pageToLoad$=merge(this.pageByManual$, this.pageByScroll$, this.pageByResize$).pipe(
      distinct(null,this.disClear$),
      filter(page => this.cache[page - 1] === undefined)
    );
    this.itemResults$ = this.pageToLoad$.pipe(
      mergeMap((page:number)=>{
        let last=this.page;
        if(page-last>1){
          let arry=[];
          for(let i=last+1;i<=page;i++){
            arry.push(i);
          }
          return of(...arry);
        }else {
          return of(page);
        }
      }),
      //mergeMap是同时进行内部订阅的，会导致不安全的数据操作。
      concatMap((page: number) => {
        return this.scrollDataSource(page,this.option.handle).pipe(
          delay(0),
          tap(resp => {
            this.page=page;
            this.cache[page-1]=resp;
          }));
      })
    );
    this.itemResults$.subscribe(_=>this.item$.next([].concat(...this.cache)));
    this.pageInit();
    return this.item$;
  }
  scrollDataSource(page:number,handle:any){
    return handle(page);
  };
  pageInit(){
    this.pageByManual$.next(1);
    this.pageByManual$.next(this.option.pageInit?this.option.pageInit:2);
  }
  refreshData(handle?:(page:number)=>void,save:boolean=false){
    if(handle){
      this.option.handle=handle;
    }
    this.cache=[];
    this.disClear$.next(1);
    //保存工作空间
    if(save){
      let top=this.dom.scrollTop;
      let lastPage=this.page;
      this.page=1;
      this.pageByManual$.next(1);
      this.pageByManual$.next(lastPage);
      setTimeout(_=>this.dom.scrollTop=top,100);
    }else{
      //不保存直接复位
      this.dom.scrollTop=0;
      this.pageInit();
    }

  }
}
