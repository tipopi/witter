import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

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
export class AppRoutingModule {
}
