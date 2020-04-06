import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BodyRoutingModule} from './body-routing.module';
import {TagsService} from "./tags/tags.service";
import {PanelComponent} from "./panel/panel.component";
import {ListComponent} from "./show/list/list.component";
import {TagsComponent} from "./tags/tags.component";
import {ShowComponent} from "./show/show.component";
import {BlogComponent} from "./blog/blog.component";
import {DetailComponent} from "./show/detail/detail.component";
import {TweetAddComponent} from "./show/tweet-add/tweet-add.component";
import {IconsProviderModule} from "../icons-provider.module";
import { BrowserModule } from '@angular/platform-browser';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollListComponent } from './show/scroll-list/scroll-list.component';
import {FrameworkModule} from "../framework/framework.module";
import { DateComponent } from './date/date.component';
import { BlogListComponent } from './blog/blog-list/blog-list.component';
import { BlogAddComponent } from './blog/blog-detail/blog-add/blog-add.component';
import {CKEditorModule} from "@ckeditor/ckeditor5-angular";
import { BlogDetailComponent } from './blog/blog-detail/blog-detail.component';
import { BlogDetailShowComponent } from './blog/blog-detail/blog-detail-show/blog-detail-show.component';
import {ToolboxModule} from "./toolbox/toolbox.module";
import {BoxComponent} from "./toolbox/box/box.component";


@NgModule({
  declarations: [
    PanelComponent,
    ListComponent,
    TagsComponent,
    ShowComponent,
    BlogComponent,
    DetailComponent,
    TweetAddComponent,
    ScrollListComponent,
    DateComponent,
    BlogListComponent,
    BlogAddComponent,
    BlogDetailComponent,
    BlogDetailShowComponent,

  ],
  exports: [
    PanelComponent
  ],

  imports: [
    CommonModule,
    BrowserModule,
    IconsProviderModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    HttpClientJsonpModule,
    ReactiveFormsModule,
    FrameworkModule,
    CKEditorModule,
    ReactiveFormsModule,
    ScrollingModule, DragDropModule,
    ToolboxModule,
    BodyRoutingModule,
  ]
})
export class BodyModule { }
