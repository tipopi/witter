import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule, Routes} from "@angular/router";
import {PanelComponent} from './panel/panel.component';
import {BlogComponent} from './blog/blog.component'
import {ShowComponent} from "./show/show.component";
import {BoxComponent} from "./toolbox/box/box.component";
export const ROUTES: Routes=[
      {
        path:'',
        redirectTo: 'tweet',
        pathMatch: 'full'
      },
      {
        path:'tweet', component :ShowComponent
      },
      {
        path:'blog',component: BlogComponent
      },
      {

        path:'tool',loadChildren:() => import('./toolbox/toolbox.module').then(m => m.ToolboxModule)
      }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(ROUTES)
  ],
  exports: [RouterModule]
})
export class BodyRoutingModule { }
