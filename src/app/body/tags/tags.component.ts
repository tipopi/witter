import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {TagsService} from "./tags.service";
import {Tag} from "../../model/tag";

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {
  tags: Tag[] =[];
  @Input() type:number;
  @Output() out: EventEmitter<number> = new EventEmitter<number>();
  constructor(private service:TagsService) { }

  ngOnInit() {
    this.service.findCount(this.type).subscribe((da: any)=>{
      if(da.data.length!=0){
        da.data.forEach(item=>{
          this.tags.push(item);
        })
      }
    });
  }
  outTag(id){
    this.out.emit(id.toString());
  }

}
