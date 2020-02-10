import {Component, Input, OnInit} from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '@ckeditor/ckeditor5-build-classic/build/translations/zh-cn.js';
@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  // @Input()
  deta="";
  public Editor = ClassicEditor;
  public config = {
    language: 'zh-cn'
  };
  constructor() { }

  ngOnInit() {
  }

}
