import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import {ShowRoutingModule} from "./show-routing.module";
import {ShowComponent} from "./show.component";



@NgModule({
  declarations: [ListComponent,DetailComponent],
  imports: [
    CommonModule,
    ShowRoutingModule
  ],
})
export class ShowModule { }
