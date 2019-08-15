import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelComponent } from './panel/panel.component';
import { TagsComponent } from './tags/tags.component';
import { BlogComponent } from './blog/blog.component';
import {BodyRoutingModule} from './body-routing.module';
import { ShowComponent } from './show/show.component';
@NgModule({
  declarations: [  TagsComponent, ShowComponent, BlogComponent],
  imports: [
    CommonModule,
    BodyRoutingModule,
  ]
})
export class BodyModule { }
