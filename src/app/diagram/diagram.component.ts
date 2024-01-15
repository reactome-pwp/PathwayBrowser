import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {DiagramService} from "../services/diagram.service";
import cytoscape from "cytoscape";
import {Style, UserProperties} from "reactome-cytoscape-style";
import {ActivatedRoute} from "@angular/router";
import {switchMap} from "rxjs";

@Component({
  selector: 'cr-diagram',
  templateUrl: './diagram.component.html',
  styleUrls: ['./diagram.component.scss']
})
export class DiagramComponent implements AfterViewInit {
  title = 'pathway-browser';
  @ViewChild('cytoscape') cytoscapeContainer?: ElementRef<HTMLDivElement>;


  constructor(private diagram: DiagramService, private route: ActivatedRoute) {

  }


  cy?: cytoscape.Core;
  reactomeStyle?: Style;


  ngAfterViewInit(): void {
    this.route.params.pipe(
      switchMap(params => this.diagram.getDiagram(params['id']))
    ).subscribe(elements => {
      const container = this.cytoscapeContainer!.nativeElement;
      const properties: UserProperties = {global: {thickness: 8}};
      this.reactomeStyle = new Style(container, {});
      this.cy = cytoscape({
        container: container,
        elements: elements,
        style: this.reactomeStyle.getStyleSheet(),
        layout: {name: "preset"},
      });
      this.reactomeStyle.bindToCytoscape(this.cy);
    })
      }

  updateStyle() {
    setTimeout(() => this.reactomeStyle?.update(this.cy!), 5)

  }

  protected readonly console = console;
}
