import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {DiagramComponent} from './diagram/diagram.component';
import {RouterOutlet} from "@angular/router";
import {AppRoutingModule} from "./app-routing.module";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from "@angular/material/button";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {CdkDrag, CdkDragHandle} from "@angular/cdk/drag-drop";
import {DiagramIteratorComponent} from './diagram-iterator/diagram-iterator.component';
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {
  CustomInteractorDialogComponent
} from './interactors/custom-interactor-dialog/custom-interactor-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatTabsModule} from "@angular/material/tabs";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatRadioModule} from "@angular/material/radio";
import {NgxMatFileInputModule} from "@angular-material-components/file-input";
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatGridListModule} from "@angular/material/grid-list";
import {InteractorsComponent} from './interactors/interactors.component';
import {ViewportComponent} from './viewport/viewport.component';
import {AngularSplitModule} from "angular-split";
import {MatCardModule} from "@angular/material/card";
import {SpeciesComponent} from './species/species.component';
import {MatRippleModule} from "@angular/material/core";
import {EventHierarchyComponent} from './event-hierarchy/event-hierarchy.component';
import {MatTreeModule} from "@angular/material/tree";
import {MatTooltipModule} from "@angular/material/tooltip";
import { DetailsComponent } from './details/details.component';
import {MatMenuModule} from "@angular/material/menu";
import { DiagramHomeComponent } from './diagram-home/diagram-home.component';


@NgModule({
  declarations: [
    AppComponent,
    DiagramComponent,
    DiagramIteratorComponent,
    CustomInteractorDialogComponent,
    InteractorsComponent,
    ViewportComponent,
    SpeciesComponent,
    EventHierarchyComponent,
    DetailsComponent,
    DiagramHomeComponent
  ],
    imports: [
        BrowserModule,
        FormsModule,
        CommonModule,
        HttpClientModule,
        RouterOutlet,
        AppRoutingModule,
        // NoopAnimationsModule,
        MatButtonModule,
        MatSlideToggleModule,
        CdkDragHandle,
        CdkDrag,
        MatInputModule,
        MatSelectModule,
        ReactiveFormsModule,
        MatProgressSpinnerModule,
        BrowserAnimationsModule,
        MatDialogModule,
        MatTabsModule,
        MatCheckboxModule,
        MatRadioModule,
        NgxMatFileInputModule,
        MatIconModule,
        MatListModule,
        MatExpansionModule,
        MatGridListModule,
        AngularSplitModule,
        MatCardModule,
        MatIconModule,
        MatRippleModule,
        MatTreeModule,
        MatTooltipModule,
        MatMenuModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
