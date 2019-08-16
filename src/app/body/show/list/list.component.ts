import {Component, ChangeDetectionStrategy, Input, OnInit} from '@angular/core';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import {Observable, Subscription, BehaviorSubject} from "rxjs";
import {ListService} from './list.service';



let cont=0;
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush ,
  providers:[ListService]
})
export class ListComponent implements OnInit{
  @Input() tag :string;
  @Input() date :Date;
  ds ;


  constructor(private service: ListService) {
  }
  ngOnInit(): void {
    cont++;
    console.log(cont);
    this.ds = new MyDataSource(this.service,this.tag,this.date);
  }


}
export class MyDataSource extends DataSource<string | undefined>  {

  private length = 100000;
  private pageSize = 12;
  private cachedData = Array.from<any>({ length: this.length });
  private fetchedPages = new Set<number>();
  private dataStream = new BehaviorSubject<any[]>(this.cachedData);
  private subscription = new Subscription();
  private date:Date;
  constructor(private service:ListService,private tag,date) {
    super();
    this.date=date;
  }




  connect(collectionViewer: CollectionViewer): Observable<any[]> {
    this.subscription.add(
      collectionViewer.viewChange.subscribe(range => {
        const startPage = this.getPageForIndex(range.start);
        const endPage = this.getPageForIndex(range.end - 1);
        for (let i = startPage; i <= endPage; i++) {
          this.fetchPage(i);
        }
      })
    );
    return this.dataStream;
  }

  disconnect(): void {
    this.subscription.unsubscribe();
  }

  private getPageForIndex(index: number): number {
    return Math.floor(index / this.pageSize);
  }

  checkTime(date){
    this.date=date;
  }

  private fetchPage(page: number): void {
    if (this.fetchedPages.has(page)) {
      return;
    }
    this.fetchedPages.add(page);

    if(this.tag=='all'){
      this.service
        .findAll(this.date)
        .subscribe((res: any) => {
          this.cachedData.splice(page * this.pageSize, this.pageSize, ...res.data);
          let n=res.data.length;
          let s=res.data[n-1].createTime.toString();
          if(n!=11){
            this.tag='none';
          }
          this.date=new Date(s);
          this.dataStream.next(this.cachedData);
        });
    }
    else if(this.tag=='none'){
      return;
    }

  }

}
