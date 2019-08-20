import {Component, ChangeDetectionStrategy, Input, OnInit} from '@angular/core';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import {Observable, Subscription, BehaviorSubject} from "rxjs";
import {ListService} from './list.service';
import {Img} from "../../../model/img";



@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush ,
  providers:[ListService]
})
export class ListComponent implements OnInit{
  @Input() tag: string;
  @Input() date: Date;
  ds ;
  img0: string=Img.img0;
  img1: string=Img.img1;

  constructor(private service: ListService) {
  }
  ngOnInit(): void {
    this.ds = new MyDataSource(this.service,this.tag,this.date);
  }
  addPower(id,power){
    this.service.addPower(id,power).subscribe();
  }


}
export class MyDataSource extends DataSource<string | undefined>  {

  private length = 10000;
  private pageSize = 10;
  private cachedData = Array.from<any>({ length: this.length });
  private fetchedPages = new Set<number>();
  private dataStream = new BehaviorSubject<any[]>(this.cachedData);
  private subscription = new Subscription();
  private continues: boolean=true;
  constructor(private service:ListService,private tag,private date) {
    super();
  }




  connect(collectionViewer: CollectionViewer): Observable<any[]> {
    this.subscription.add(
      collectionViewer.viewChange.subscribe(range => {
        const startPage = this.getPageForIndex(range.start);
        const endPage = this.getPageForIndex(range.end - 1);
        console.log(startPage);
        console.log(endPage);
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
  //列表高度*2这里分母就*2，其他倍数同理
  private getPageForIndex(index: number): number {
    return Math.floor(index / (this.pageSize*2));
  }

  private fetchPage(page: number): void {
    if (this.fetchedPages.has(page)) {
      return;
    }
    this.fetchedPages.add(page);
    if(!this.continues){
      return;
    }
      this.service
        .findAll(this.tag ,this.date)
        .subscribe((res: any) => {
          let n=res.data.length;
          if(n==0){
            this.continues=false;
            return;
          }
          this.cachedData.splice(page * this.pageSize, this.pageSize, ...res.data);
          let s=res.data[n-1].createTime.toString();
          if(n!=this.pageSize){
            this.continues=false;
          }
          this.date=new Date(s);
          this.dataStream.next(this.cachedData);
        });
  }

}
