import {AfterViewInit, Component, ElementRef, Input, OnChanges, Output, SimpleChanges, ViewChild} from '@angular/core';
import {DiagramService} from "../services/diagram.service";
import cytoscape from "cytoscape";
// @ts-ignore
import {ReactomeEvent, Style} from "reactome-cytoscape-style";
import {ActivatedRoute} from "@angular/router";
import {DarkService} from "../services/dark.service";
import {InteractorService} from "../services/interactor.service";
import {
  concatMap,
  distinctUntilChanged,
  filter,
  fromEvent,
  map,
  mergeAll,
  Observable,
  of,
  share,
  Subject,
  tap
} from "rxjs";
import {ReactomeEventTypes} from "../../../projects/reactome-cytoscape-style/src/lib/model/reactome-event.model";


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
  STATIC: string = 'Static'; //IntAct
  DISGENET: string = 'DisGeNet';


  constructor(private diagram: DiagramService, private route: ActivatedRoute, public dark: DarkService, private interactorsService: InteractorService) {
  }

  cy!: cytoscape.Core;
  cyCompare!: cytoscape.Core;
  legend!: cytoscape.Core;
  reactomeStyle!: Style;
  private _reactomeEvents$: Subject<ReactomeEvent> = new Subject<ReactomeEvent>();
  private _ignore = false;
  @Output()
  public reactomeEvents$: Observable<ReactomeEvent> = this._reactomeEvents$.asObservable().pipe(
    distinctUntilChanged((prev, current) => prev.type === current.type && prev.detail.reactomeId === current.detail.reactomeId),
    tap(e => console.log(e.type, e.detail, e.detail.element.data(), e.detail.cy.container()?.id)),
    filter(() => !this._ignore),
    share()
  );

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
        this.reactomeStyle.clearCache();

        if (this.comparing) {

          this.cy.elements('[!isBackground]').style('visibility', 'hidden')
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

          this.cyCompare.elements('[?isFadeOut]').style('visibility', 'hidden');
          this.cyCompare.elements('.Compartment').style('visibility', 'hidden');
          this.cy!.nodes('.crossed').removeClass('crossed');

          this.cyCompare!.on('viewport', () => this.syncViewports(this.cyCompare, compareContainer, this.cy, container))
          this.cy!.on('viewport', () => this.syncViewports(this.cy, container, this.cyCompare, compareContainer))

          this.reactomeEvents$.subscribe(event => {
            const src = event.detail.cy;
            const tgt = src === this.cy ? this.cyCompare : this.cy;

            const replacedBy = event.detail.element.data('replacedBy') ||
              event.detail.element.data('replacement') ||
              (event.detail.element.data('isBackground') && !event.detail.element.data('isFadeOut') && event.detail.element.data('id'))
            if (!replacedBy) return;

            let replacements = tgt.getElementById(replacedBy);
            if (event.detail.type === 'reaction') {
              replacements = replacements.add(tgt.elements(`[reactionId=${replacedBy}]`))
            }

            this.applyEvent(event, replacements)
          })

          this.reactomeStyle?.bindToCytoscape(this.cyCompare);
          this.cyCompare.minZoom(this.cy!.minZoom())
          this.cyCompare.maxZoom(this.cy!.maxZoom())
          this.updateReplacementVisibility()

          setTimeout(() => {
            this.syncViewports(this.cy!, container, this.cyCompare, compareContainer)
          })
        }
      })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['diagramId']) this.loadDiagram();
  }


  ngAfterViewInit(): void {
    this.dark.$dark.subscribe(this.updateStyle.bind(this))

    const container = this.cytoscapeContainer!.nativeElement;
    const compareContainer = this.compareContainer!.nativeElement;
    Object.values(ReactomeEventTypes).forEach((type) => {
      container.addEventListener(type, (e) => this._reactomeEvents$.next(e as ReactomeEvent))
      compareContainer.addEventListener(type, (e) => this._reactomeEvents$.next(e as ReactomeEvent))
    })

    this.reactomeStyle = new Style(container);

    const legendContainer = this.legendContainer!.nativeElement;

    this.diagram.getLegend()
      .subscribe(legend => {
        this.legend = cytoscape({
          container: legendContainer,
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

    let ignore = false;

    // legendContainer.addEventListener(type, (e) => this._reactomeEvents$.next(e as ReactomeEvent))
    of(...Object.values(ReactomeEventTypes)).pipe(
      map(type => fromEvent(legendContainer, type)),
      mergeAll(),
      filter(() => !this._ignore),
      concatMap(e => {
        const event = e as ReactomeEvent;
        const classes = event.detail.element.classes();
        let matchingElement: cytoscape.NodeCollection | cytoscape.EdgeCollection = this.cy.elements(`.${classes[0]}`);

        if (event.detail.type === 'PhysicalEntity' || event.detail.type === 'Pathway') {
          if (classes.includes('drug')) matchingElement = matchingElement.nodes('.drug')
          else matchingElement = matchingElement.not('.drug')
        } else if (event.detail.type === 'reaction') {
          const reaction = event.detail.element.nodes('.reaction');
          matchingElement = this.cy.nodes(`.${reaction.classes()[0]}`)
          matchingElement = matchingElement.add(matchingElement.connectedEdges())
        }

        this._ignore = true;
        switch (event.type) {
          case ReactomeEventTypes.select:
            this.flagElements(matchingElement)
            break;
          case ReactomeEventTypes.unselect:
            this.flagElements(this.cy.collection())
            break;
          case ReactomeEventTypes.hover:
            matchingElement.addClass('hover')
            break;
          case ReactomeEventTypes.leave:
            matchingElement.removeClass('hover')
            break;
        }
        this._ignore = false;

        return matchingElement;
      })
    ).subscribe()


    this.reactomeEvents$.subscribe(event => {
      const classes = event.detail.element.classes();
      let matchingElement: cytoscape.NodeCollection | cytoscape.EdgeCollection = this.legend.elements(`.${classes[0]}`);

      if (event.detail.type === 'PhysicalEntity') {
        if (classes.includes('drug')) matchingElement = matchingElement.nodes('.drug')
        else matchingElement = matchingElement.not('.drug')
      } else if (event.detail.type === 'reaction') {
        const reaction = event.detail.element.nodes('.reaction');
        matchingElement = this.legend.nodes(`.${reaction.classes()[0]}`).first()
        matchingElement = matchingElement.add(matchingElement.connectedEdges())
      }

      this._ignore = true;
      this.applyEvent(event, matchingElement);
      this._ignore = false;
    })

    this.loadDiagram();
  }

  flag(accs: string[]): cytoscape.CollectionArgument {
    let toFlag: cytoscape.Collection;

    toFlag = this.cy.elements(`[acc=${accs[0]}]`).or(`[reactomeId=${accs[0]}]`)
    for (let i = 1; i < accs.length; i++) {
      toFlag = toFlag.or(`[acc=${accs[i]}]`).or(`[reactomeId=${accs[i]}]`)
    }

    return this.flagElements(toFlag)
  }

  flagElements(toFlag: cytoscape.CollectionArgument): cytoscape.CollectionArgument {
    const shadowNodes = this.cy.nodes('.Shadow');
    const shadowEdges = this.cy.edges('[?color]');
    const trivials = this.cy.elements('.trivial');

    if (toFlag.nonempty()) {
      this.cy.batch(() => {
        shadowNodes.style({visibility: 'hidden'})
        shadowEdges.removeClass('shadow')
        this.cy.off('zoom', this.reactomeStyle.interactivity.onZoom)
        trivials.style({opacity: 1})
        this.cy.edges().style({'underlay-opacity': 0})
        this.cy.elements().removeClass('flag')
        toFlag.addClass('flag')
          .edges().style({'underlay-opacity': 1})
      })

      return toFlag
    } else {
      this.cy.batch(() => {
        shadowNodes.style({visibility: 'visible'})
        trivials.style({opacity: 1})
        shadowEdges.addClass('shadow')

        this.cy.elements().removeClass('flag')
        this.cy.on('zoom', this.reactomeStyle.interactivity.onZoom)
        this.reactomeStyle.interactivity.onZoom()
      })

      return this.cy.collection()
    }
  }


  applyEvent(event: ReactomeEvent, affectedElements: cytoscape.NodeCollection | cytoscape.EdgeCollection) {
    switch (event.type) {
      case ReactomeEventTypes.hover:
        affectedElements.addClass('hover');
        break;
      case ReactomeEventTypes.leave:
        affectedElements.removeClass('hover');
        break;
      case ReactomeEventTypes.select:
        affectedElements.select();
        break;
      case ReactomeEventTypes.unselect:
        affectedElements.unselect();
        break;
    }
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


  getInteractors(resource: string) {
    this.interactorsService.getInteractorData(this.cy, resource).subscribe(interactors => {
      this.interactorsService.addInteractorOccurrenceNode(interactors, this.cy, resource)
    });
  }

  getPsicquicResource() {
    this.interactorsService.getPsicquicResources().subscribe(resources => {
      this.psicquicResources = resources;
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
