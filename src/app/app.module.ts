import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {DiagramComponent} from './diagram/diagram.component';
import {RouterOutlet} from "@angular/router";
import {AppRoutingModule} from "./app-routing.module";
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from "@angular/material/button";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {CdkDrag, CdkDragHandle} from "@angular/cdk/drag-drop";

@NgModule({
  declarations: [
    AppComponent,
    DiagramComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    RouterOutlet,
    AppRoutingModule,
    NoopAnimationsModule,
    MatButtonModule,
    MatSlideToggleModule,
    CdkDragHandle,
    CdkDrag
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
