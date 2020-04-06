import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PanelComponent} from "./body/panel/panel.component";
const routes: Routes = [
  // {
  //   path: '', redirectTo:'panel',pathMatch: 'full'
  // },
  // {
  //   // path: 'panel', loadChildren: './body/body-routing.module#BodyRoutingModule'
  //   path: '',component: PanelComponent
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
