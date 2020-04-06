import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToolboxRoutingModule } from './toolbox-routing.module';
import { JsonUtilComponent } from './json-util/json-util.component';
import { BoxComponent } from './box/box.component';
import { TimeUtilComponent } from './time-util/time-util.component';
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NgZorroAntdModule} from "ng-zorro-antd";


@NgModule({
  declarations: [BoxComponent,JsonUtilComponent, TimeUtilComponent],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    FormsModule,
    ToolboxRoutingModule
  ]
})
export class ToolboxModule { }
