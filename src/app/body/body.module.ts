import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BodyRoutingModule} from './body-routing.module';
import {TagsService} from "./tags/tags.service";
@NgModule({
  declarations: [
  ],

  imports: [
    CommonModule,
    BodyRoutingModule,
  ],
  providers:[TagsService]
})
export class BodyModule { }
