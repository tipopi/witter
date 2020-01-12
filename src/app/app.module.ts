import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IconsProviderModule } from './icons-provider.module';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import {HeadComponent} from './head/head.component';
import {LoginComponent} from './login/login.component';
import {BodyModule} from './body/body.module'
import {PanelComponent} from "./body/panel/panel.component";
import {HttpClientJsonpModule} from "@angular/common/http";
import { ScrollingModule } from '@angular/cdk/scrolling';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {ListComponent} from "./body/show/list/list.component";
import {TagsComponent} from "./body/tags/tags.component";
import {ShowComponent} from "./body/show/show.component";
import {BlogComponent} from "./body/blog/blog.component";
import {DetailComponent} from "./body/show/detail/detail.component";
import {LocalStorage} from "./local.storage";
import {TweetAddComponent} from "./body/show/tweet-add/tweet-add.component";
import {FrameworkModule} from "./framework/framework.module";
registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeadComponent,
    PanelComponent,
    ListComponent,
    TagsComponent,
    ShowComponent,
    BlogComponent,
    DetailComponent,
    TweetAddComponent
  ],
  imports: [
    BrowserModule,
    IconsProviderModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    HttpClientJsonpModule,
    ReactiveFormsModule,
    ScrollingModule, DragDropModule,
    BodyModule,
    FrameworkModule,
    AppRoutingModule
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN },LocalStorage],
  bootstrap: [AppComponent]
})
export class AppModule { }
