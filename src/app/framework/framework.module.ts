import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InfiniteScrollListComponent} from './component/infinite-scroll-list/infinite-scroll-list.component';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {EditorComponent} from './component/editor/editor.component';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';

@NgModule({
  declarations: [InfiniteScrollListComponent, EditorComponent],
  exports: [
    InfiniteScrollListComponent,
    EditorComponent,

  ],
  imports: [
    CommonModule,
    ScrollingModule,
    CKEditorModule,
  ]
})
export class FrameworkModule {
}
