import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule, Routes} from "@angular/router";
import {PanelComponent} from './panel/panel.component';
import {BlogComponent} from './blog/blog.component'
export const ROUTES: Routes=[
  {
    path:'',
    component: PanelComponent,
    children:[
      // {
      //   path:'',
      //   redirectTo: 'tweet',
      //   pathMatch: 'full'
      // },
      {
        path:'tweet', loadChildren: './show/show-routing.module#ShowRoutingModule'
      },
      {
        path:'blog',component: BlogComponent
      }
    ]
  },

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
export class BodyRoutingModule { }
