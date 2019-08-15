import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelComponent } from './panel/panel.component';
import { TagsComponent } from './tags/tags.component';
import { ShowComponent } from './show/show.component';
import { BlogComponent } from './blog/blog.component';
import {BodyRoutingModule} from './body-routing.module';
import {ShowModule} from "./show/show.module";


@NgModule({
  declarations: [ PanelComponent, TagsComponent, ShowComponent, BlogComponent],
  imports: [
    CommonModule,
    ShowModule,
    BodyRoutingModule,
  ]
})
export class BodyModule { }
