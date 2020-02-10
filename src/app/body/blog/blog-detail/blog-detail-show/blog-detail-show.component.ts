import {Component, Input, OnInit} from '@angular/core';
import { Blog } from 'src/app/model/blog';

@Component({
  selector: 'app-blog-detail-show',
  templateUrl: './blog-detail-show.component.html',
  styleUrls: ['./blog-detail-show.component.css']
})
export class BlogDetailShowComponent implements OnInit {
  @Input()
  item:Blog;
  constructor() { }

  ngOnInit() {

  }

}
