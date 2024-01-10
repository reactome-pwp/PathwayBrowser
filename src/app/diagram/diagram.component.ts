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


  ngAfterViewInit(): void {
    this.route.params.pipe(
      switchMap(params => this.diagram.getDiagram(params['id']))
    ).subscribe(elements => {
      const container = this.cytoscapeContainer!.nativeElement;
      const properties: UserProperties = {global: {thickness: 8}};
      const reactomeStyle = new Style(container, {});
      this.cy = cytoscape({
        container: container,
        elements: elements,
        style: reactomeStyle.getStyleSheet(),
        layout: {name: "preset"},
      });
      reactomeStyle.bindToCytoscape(this.cy);
      // this.cy.nodes().addClass('debug')


      // this.cy.on("ready", () => ))

    })

    // setTimeout(() => {
    //   properties.global!.thickness = 4;
    //   reactomeStyle.update(this.cy!)
    //   this.redraw()
    // }, 5000)


    // this.cy.on('zoom', (e, extraParams) => {
    //   console.log(this.cy!.zoom())
    // })

  }
}
