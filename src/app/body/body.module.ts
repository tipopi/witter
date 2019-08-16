import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagsComponent } from './tags/tags.component';
import { BlogComponent } from './blog/blog.component';
import {BodyRoutingModule} from './body-routing.module';
import { ShowComponent } from './show/show.component';
import {DetailComponent} from "./show/detail/detail.component";

@NgModule({
  declarations: [
  ],

  imports: [
    CommonModule,
    BodyRoutingModule,
  ]
})
export class BodyModule { }
