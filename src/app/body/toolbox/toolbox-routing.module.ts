import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BoxComponent} from "./box/box.component";
import {JsonUtilComponent} from "./json-util/json-util.component";
import {TimeUtilComponent} from "./time-util/time-util.component";
import {TranslateComponent} from "./translate/translate.component";


const routes: Routes = [
  {
    path: 'tool',
    component: BoxComponent,
    children: [

      {
        path: "json",
        component: JsonUtilComponent
      },
      {
        path: "time",
        component: TimeUtilComponent
      },
      {
        path: "trans",
        component: TranslateComponent
      },
      {
        path: '',
        redirectTo: 'trans',
        pathMatch: 'full'
      },
    ]

  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ToolboxRoutingModule {
}
