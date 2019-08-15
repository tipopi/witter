import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import {RouterModule, Routes} from "@angular/router";
import {ShowComponent} from "./show.component";
import {BrowserModule} from "@angular/platform-browser";

export const ROUTES: Routes=[
  {
    path:'',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path:'list' ,component: ListComponent
  },
  {
    path:'detail:id' ,component: DetailComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forChild(ROUTES)
  ],
  exports: [RouterModule]
})
export class ShowRoutingModule { }
