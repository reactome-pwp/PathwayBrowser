import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import cytoscape from 'cytoscape';
import {Reactome} from "reactome-cytoscape-style";
import {DiagramService} from "./services/diagram.service";

@Component({
  selector: 'cr-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
}
