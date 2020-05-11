import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {BlogComponent} from './blog/blog.component'
import {ShowComponent} from "./show/show.component";

export const ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'tweet',
    pathMatch: 'full'
  },
  {
    path: 'tweet', component: ShowComponent
  },
  {
    path: 'blog', component: BlogComponent
  },
  {

    path: 'tool', loadChildren: () => import('./toolbox/toolbox.module').then(m => m.ToolboxModule)
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(ROUTES)
  ],
  exports: [RouterModule]
})
export class BodyRoutingModule {
}
