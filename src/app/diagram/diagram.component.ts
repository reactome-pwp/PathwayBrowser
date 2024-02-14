import {AfterViewInit, Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import {DiagramService} from "../services/diagram.service";
import cytoscape from "cytoscape";
// @ts-ignore
import {Style} from "reactome-cytoscape-style";
import {ActivatedRoute} from "@angular/router";
import {DarkService} from "../services/dark.service";
import {InteractorService} from "../services/interactor.service";

@Component({
  selector: 'cr-diagram',
  templateUrl: './diagram.component.html',
  styleUrls: ['./diagram.component.scss']
})
export class DiagramComponent implements AfterViewInit, OnChanges {
  title = 'pathway-browser';
  @ViewChild('cytoscape') cytoscapeContainer?: ElementRef<HTMLDivElement>;
  @ViewChild('cytoscapeCompare') compareContainer?: ElementRef<HTMLDivElement>;
  @ViewChild('legend') legendContainer?: ElementRef<HTMLDivElement>;

  comparing: boolean = false;
  INTACT: string = 'IntAct';
  DISGENET: string = 'DisGeNet';


  constructor(private diagram: DiagramService, private route: ActivatedRoute, public dark: DarkService, private interactorsService: InteractorService) {
  }

  cy!: cytoscape.Core;
  cyCompare!: cytoscape.Core;
  legend!: cytoscape.Core;
  reactomeStyle!: Style;

  @Input('id') diagramId: string = '';

  loadDiagram() {
    if (!this.cytoscapeContainer) return;

    const container = this.cytoscapeContainer!.nativeElement;

    this.diagram.getDiagram(this.diagramId)
      .subscribe(elements => {
        this.comparing = elements.nodes.some(node => node.data['isFadeOut']) || elements.edges.some(edge => edge.data['isFadeOut'])
        this.cy = cytoscape({
          container: container,
          elements: elements,
          style: this.reactomeStyle?.getStyleSheet(),
          layout: {name: "preset"},
        });
        this.reactomeStyle.bindToCytoscape(this.cy);
        this.reactomeStyle.clearCache()

        setTimeout(() => {
          if (this.comparing) {

            this.cy!.edges('[!isBackground]').style('visibility', 'hidden')
            this.cy!.nodes('[!isBackground]').style('visibility', 'hidden')
            this.replacedElements = this.cy!
              .elements('[?replacedBy]')
              .add('[?isCrossed]')
              .sort((a, b) => a.boundingBox().x1 - b.boundingBox().x1);
            this.replacedElementsLeft = this.replacedElements.map(ele => ele.boundingBox().x1);
            this.cy!.elements('.Compartment').style('visibility', 'visible')

            const compareContainer = this.compareContainer!.nativeElement;
            this.cyCompare = cytoscape({
              container: compareContainer,
              elements: elements,
              style: this.reactomeStyle?.getStyleSheet(),
              layout: {name: "preset"},
            });
            this.cyCompare.elements('[?isFadeOut]').not('.crossed').style('visibility', 'hidden');
            this.cyCompare.elements('.Compartment').style('visibility', 'hidden');
            // this.cy!.nodes('[?isCrossed]').data('isCrossed', false);
            this.cy!.nodes('.crossed').removeClass('crossed');


            this.cyCompare!.on('viewport', () => this.syncViewports(this.cyCompare, compareContainer, this.cy, container))
            this.cy!.on('viewport', () => this.syncViewports(this.cy, container, this.cyCompare, compareContainer))

            this.reactomeStyle?.bindToCytoscape(this.cyCompare);
            this.cyCompare.minZoom(this.cy!.minZoom())
            this.cyCompare.maxZoom(this.cy!.maxZoom())
            this.syncViewports(this.cy!, container, this.cyCompare, compareContainer)
            this.updateReplacementVisibility()
          }
        })
      })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['diagramId']) this.loadDiagram();
  }


  ngAfterViewInit(): void {
    this.dark.$dark.subscribe(this.updateStyle.bind(this))

    const container = this.cytoscapeContainer!.nativeElement;
    this.reactomeStyle = new Style(container);

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
        this.legend.zoomingEnabled(false);
        this.legend.panningEnabled(false);
        this.legend.minZoom(0)
        const bb = this.legend.elements().boundingBox();
        // this.ratio = bb.w / bb.h;
      });

    this.loadDiagram();
  }


  ratio = 0.384;

  replacedElements!: cytoscape.Collection;
  replacedElementsLeft: number[] = [];

  lastIndex = 0;

  private updateReplacementVisibility() {
    const extent = this.cyCompare!.extent();
    let limitIndex = this.replacedElementsLeft.findIndex(x1 => x1 >= extent.x1);
    if (limitIndex === -1) limitIndex = this.replacedElements.length;
    if (this.lastIndex !== limitIndex) {
      if (limitIndex < this.lastIndex) this.replacedElements.slice(limitIndex, this.lastIndex).style('visibility', 'hidden');
      if (limitIndex > this.lastIndex) this.replacedElements.slice(this.lastIndex, limitIndex).style('visibility', 'visible');
    }
    this.lastIndex = limitIndex
  }

  syncing = false;
  syncViewports = (source: cytoscape.Core, sourceContainer: HTMLElement, target: cytoscape.Core, targetContainer: HTMLElement) => {
    if (this.syncing) return;
    this.syncing = true;
    this.updateReplacementVisibility();

    const position = {...source.pan()};
    const sourceX = sourceContainer.getBoundingClientRect().x;
    const targetX = targetContainer.getBoundingClientRect().x;
    position.x += sourceX - targetX;
    target.viewport({
      zoom: source.zoom(),
      pan: position,
    })
    this.syncing = false;
  };


  getStaticInteractors(resource: string) {
    this.interactorsService.getStaticInteractorData(this.cy).subscribe(interactors => {
      this.diagram.addOccurrenceAndInteractors(interactors, this.cy, resource)
    });
  }

  getDiseaseInteractors(resource: string) {
    this.interactorsService.getDiseaseInteractorData(this.cy).subscribe(interactors => {
      this.diagram.addOccurrenceAndInteractors(interactors, this.cy, resource)
    });
  }

  updateStyle() {
    this.cy ? setTimeout(() => this.reactomeStyle?.update(this.cy), 5) : null;
    this.cyCompare ? setTimeout(() => this.reactomeStyle?.update(this.cyCompare), 5) : null;
    this.legend ? setTimeout(() => this.reactomeStyle?.update(this.legend), 5) : null;
  }

  compareDragging = false;

  dragStart() {
    this.compareDragging = true;
  }

  dragEnd() {
    this.compareDragging = false;
  }

  dragMove($event: MouseEvent, compareContainer: HTMLDivElement) {
    if (!this.compareDragging) return;
    compareContainer.style['left'] = $event.x + 'px';
    this.cyCompare.resize()
    this.syncViewports(this.cy!, this.cytoscapeContainer!.nativeElement, this.cyCompare!, this.compareContainer!.nativeElement);
  }

  updateLegend() {
    this.legend.resize()
    this.legend.panningEnabled(true)
    this.legend.zoomingEnabled(true)
    this.legend.fit(this.legend.elements(), 2)
    this.legend.panningEnabled(false)
    this.legend.zoomingEnabled(false)
  }
}
