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
  @ViewChild('legend') legendContainer?: ElementRef<HTMLDivElement>;


  constructor(private diagram: DiagramService, private route: ActivatedRoute) {

  }


  cy?: cytoscape.Core;
  legend?: cytoscape.Core;
  reactomeStyle?: Style;


  ngAfterViewInit(): void {
    const container = this.cytoscapeContainer!.nativeElement;
    this.reactomeStyle = new Style(container);

    this.route.params.pipe(
      switchMap(params => this.diagram.getDiagram(params['id']))
      // switchMap(params => this.diagram.getLegend())
    ).subscribe(elements => {

      this.cy = cytoscape({
        container: container,
        elements: elements,
        style: this.reactomeStyle?.getStyleSheet(),
        layout: {name: "preset"},
      });
      this.reactomeStyle?.bindToCytoscape(this.cy);
    })

    this.diagram.getLegend()
      .subscribe(legend => {
        const container = this.legendContainer!.nativeElement;
        this.legend = cytoscape({
          container: container,
          elements: legend,
          style: this.reactomeStyle?.getStyleSheet(),
          layout: {name: "preset"},
          boxSelectionEnabled: false
        });
        this.reactomeStyle?.bindToCytoscape(this.legend);
        this.legend.zoomingEnabled(false)
        this.legend.panningEnabled(false)
      })
  }

  getInteractors() {
    this.diagram.getInteractorData(this.cy)
      .subscribe(interactors => {
        this.diagram.addOccurrenceAndInteractors(interactors, this.cy)
      })
  }

  updateStyle() {
    setTimeout(() => this.reactomeStyle?.update(this.cy!), 5)
    setTimeout(() => this.reactomeStyle?.update(this.legend!), 5)
  }
}
