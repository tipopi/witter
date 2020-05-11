import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ToolboxRoutingModule} from './toolbox-routing.module';
import {JsonUtilComponent} from './json-util/json-util.component';
import {BoxComponent} from './box/box.component';
import {TimeUtilComponent} from './time-util/time-util.component';
import {FormsModule} from "@angular/forms";
import {NgZorroAntdModule} from "ng-zorro-antd";
import {TranslateComponent} from './translate/translate.component';


@NgModule({
  declarations: [BoxComponent, JsonUtilComponent, TimeUtilComponent, TranslateComponent],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    FormsModule,
    ToolboxRoutingModule
  ]
})
export class ToolboxModule {
}
