import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {DiagramService} from "../services/diagram.service";
import cytoscape from "cytoscape";
import {Style} from "reactome-cytoscape-style";
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
  @ViewChild('cytoscapeCompare') compareContainer?: ElementRef<HTMLDivElement>;
  @ViewChild('legend') legendContainer?: ElementRef<HTMLDivElement>;

  comparing: boolean = false;

  constructor(private diagram: DiagramService, private route: ActivatedRoute) {

  }

  cy!: cytoscape.Core;
  cyCompare!: cytoscape.Core;
  legend!: cytoscape.Core;
  reactomeStyle!: Style;


  ngAfterViewInit(): void {
    const container = this.cytoscapeContainer!.nativeElement;
    this.reactomeStyle = new Style(container);

    this.route.params.pipe(
      switchMap(params => this.diagram.getDiagram(params['id']))
    ).subscribe(elements => {
      this.comparing = elements.nodes.some(node => node.data['isFadeOut']) || elements.edges.some(edge => edge.data['isFadeOut'])
      this.cy = cytoscape({
        container: container,
        elements: elements,
        style: this.reactomeStyle?.getStyleSheet(),
        layout: {name: "preset"},
      });
      this.reactomeStyle?.bindToCytoscape(this.cy);

      const shadows = this.cy.nodes('.Shadow');
      shadows.forEach(shadow => {
        shadow.data('idealPosition', shadow.position())
        shadow.grabify()
        // @ts-ignore
        shadow.unpanify()
      })

      shadows.forEach(a => {
        shadows.forEach( b => {
          if (a === b) return;


        })
      })
      const duration = 20;

      // setInterval(i =>
      //   shadows.forEach(shadow => {
      //     const idealPosition = shadow.data('idealPosition');
      //     const currentPosition = shadow.position();
      //     const currentPositionVec = array([currentPosition.x, currentPosition.y]);
      //
      //     const attractiveForce = array([idealPosition.x - currentPosition.x, idealPosition.y - currentPosition.y]);
      //     const g = 100;
      //     if (attractiveForce.x !== 0 && attractiveForce.y !== 0) attractiveForce.scale( shadow.length * g / Math.pow(attractiveForce.norm(), 2))
      //     // console.log(attractiveForce.x, attractiveForce.y);
      //
      //     const repulsiveForces: NDArray = array([0, 0]);
      //     const otherShadows = shadows.copy().not(shadow);
      //     otherShadows.forEach(otherShadow => {
      //       const otherPosition = otherShadow.position();
      //       const repulsiveForce = array([currentPosition.x - otherPosition.x, currentPosition.y - otherPosition.y]);
      //       repulsiveForces.add(repulsiveForce, g / Math.pow(repulsiveForce.norm(), 2))
      //       // console.log(repulsiveForce.x, repulsiveForce.y)
      //       // console.log(repulsiveForces.x, repulsiveForces.y)
      //     })
      //     // repulsiveForces.scale(1 / Math.pow(repulsiveForces.norm(), 2))
      //     const forces = attractiveForce.add(repulsiveForces);
      //     // console.log(forces.x, forces.y)
      //     // console.log(currentPositionVec.x, currentPositionVec.y)
      //     const pos = currentPositionVec.add(forces);
      //     // console.log(pos.x, pos.y)
      //     shadow.stop().animate({position: {x: pos.x, y: pos.y}, duration: duration})
      //
      //   }), duration)

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
      })
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


  getInteractors() {
    this.diagram.getInteractorData(this.cy)
      .subscribe(interactors => {
        this.diagram.addOccurrenceAndInteractors(interactors, this.cy)
      })
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
