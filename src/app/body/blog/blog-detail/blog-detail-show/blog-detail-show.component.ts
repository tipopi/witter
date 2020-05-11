import {Component, Input, OnInit} from '@angular/core';
import {Blog} from 'src/app/model/blog';
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-blog-detail-show',
  templateUrl: './blog-detail-show.component.html',
  styleUrls: ['./blog-detail-show.component.css']
})
export class BlogDetailShowComponent implements OnInit {
  @Input()
  item: Blog;
  tagColor = new Map([
    [0, 'magenta'],
    [1, 'purple'],
    [2, 'blue'],
    [3, 'volcano']
  ]);
url=this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/watch?v=7tHTqcSq1qg');
  constructor(private sanitizer: DomSanitizer) {
  }

  ngOnInit() {

  }

}
