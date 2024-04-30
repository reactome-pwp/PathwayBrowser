import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {DiagramService} from "../services/diagram.service";
import cytoscape from "cytoscape";
import {ReactomeEvent, Style} from "reactome-cytoscape-style";
import {DarkService} from "../services/dark.service";
import {InteractorService} from "../interactors/services/interactor.service";
import {
  concatMap,
  delay,
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
import {PsicquicResource, Resource} from "../interactors/model/interactor-entity.model";
import {MatSelect} from "@angular/material/select";
import {FormControl} from "@angular/forms";
import {DiagramStateService} from "../services/diagram-state.service";
import {MatDialog} from "@angular/material/dialog";
import {CustomInteractorDialogComponent} from "../interactors/custom-interactor-dialog/custom-interactor-dialog.component";
import {ResourceType} from "../interactors/common/overlay-resource";


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
  @ViewChild('psicquicSelect') psicquicSelect?: MatSelect;

  comparing: boolean = false;
  psicquicResources: PsicquicResource[] = []
  selectedPsicquicResource = new FormControl();
  isDataFromPsicquicLoading: boolean = false;
  resourceTokens: Resource[] = [];
  ResourceType = ResourceType;


  constructor(private diagram: DiagramService, public dark: DarkService, private interactorsService: InteractorService, private state: DiagramStateService, public dialog: MatDialog, private cdr: ChangeDetectorRef) {
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

  private stateToDiagramSub = this.state.state$.subscribe(() => this.stateToDiagram())


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

        this.stateToDiagram();
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

    // legendContainer.addEventListener(type, (e) => this._reactomeEvents$.next(e as ReactomeEvent))
    const legend2state = of(...Object.values(ReactomeEventTypes)).pipe(
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

        // this._ignore = true;
        switch (event.type) {
          case ReactomeEventTypes.select:
            // this.flagElements(matchingElement, this.cy);
            this.state.set('flag', [classes[0] + (classes.includes('drug') ? '.' : '!') + 'drug'])
            this.stateToDiagram();
            break;
          case ReactomeEventTypes.unselect:
            this.state.set('flag', [])
            this.stateToDiagram();
            // this.flagElements(this.cy.collection(), this.cy);
            break;
          case ReactomeEventTypes.hover:
            matchingElement.addClass('hover')
            break;
          case ReactomeEventTypes.leave:
            matchingElement.removeClass('hover')
            break;
        }
        // this._ignore = false;

        return matchingElement;
      })
    ).subscribe();


    const diagram2legend = this.reactomeEvents$.subscribe(event => {
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
    });

    const diagramSelect2state = this.reactomeEvents$
      .pipe(delay(0))
      .subscribe(e => {
          if (e.type !== ReactomeEventTypes.select) return;
          let elements: cytoscape.NodeSingular = e.detail.element;
          if (e.detail.type === 'reaction') {
            elements = e.detail.cy.elements('node.reaction:selected')
          }
          const reactomeIds = elements.map(el => el.data('graph.stId'));
          this.state.set('select', reactomeIds)
        }
      );

    const selectInteractorNumber = this.reactomeEvents$
      .pipe(
        filter(e => [ReactomeEventTypes.open, ReactomeEventTypes.close].includes(e.type as ReactomeEventTypes)),
        filter(e => e.detail.type === 'Interactor'),
      ).subscribe(e => {
          let elements: cytoscape.NodeSingular = e.detail.element;
          const interactorNumberNodes = elements.nodes()
          this.interactorsService.addInteractorNodes(interactorNumberNodes, this.cy);
        }
      );

    this.loadDiagram();

    this.getPsicquicResources();
  }


  private stateToDiagram() {
    for (let cy of [this.cy, this.cyCompare].filter(cy => cy !== undefined)) {
      this.flag(this.state.get('flag'), cy);
      this.select(this.state.get("select"), cy);
      this.getInteractors(this.state.get("overlay"))
    }
  }

  getElements(accs: (string | number)[], cy: cytoscape.Core): cytoscape.CollectionArgument {
    let elements: cytoscape.Collection;

    elements = cy.collection()
    for (let i = 0; i < accs.length; i++) {
      const acc = accs[i];
      if (typeof acc === 'string') {
        if (acc.startsWith('R-')) {
          elements = elements.or(`[graph.stId="${acc}"]`)
        } else {
          if (acc.endsWith('!drug')) {
            elements = elements.or(`.${acc}`).not('.drug')
          } else {
            elements = elements.or(`.${acc}`).and('.drug')
          }
        }
      } else {
        elements = elements.or(`[acc=${acc}]`).or(`[reactomeId=${acc}]`)
      }
    }
    return elements;
  }

  select(accs: (string | number)[], cy: cytoscape.Core): cytoscape.CollectionArgument {
    const select = this.state.get("select");
    console.log(select)
    let selected = this.getElements(select, cy);
    selected.select();
    this.state.get("flag")
    if ("connectedNodes" in selected) {
      console.log("Connected nodes", selected.connectedNodes())
      selected = selected.add(selected.connectedNodes());
    }
    cy.fit(selected, 100)
    return selected;
  }

  flag(accs: (string | number)[], cy: cytoscape.Core): cytoscape.CollectionArgument {
    return this.flagElements(this.getElements(accs, cy), cy)
  }

  flagElements(toFlag: cytoscape.CollectionArgument, cy: cytoscape.Core): cytoscape.CollectionArgument {
    const shadowNodes = cy.nodes('.Shadow');
    const shadowEdges = cy.edges('[?color]');
    const trivials = cy.elements('.trivial');

    if (toFlag.nonempty()) {
      this.cy.batch(() => {
        shadowNodes.style({visibility: 'hidden'})
        shadowEdges.removeClass('shadow')
        cy.off('zoom', this.reactomeStyle.interactivity.onZoom)
        trivials.style({opacity: 1})
        cy.edges().style({'underlay-opacity': 0})
        cy.elements().removeClass('flag')
        toFlag.addClass('flag')
          .edges().style({'underlay-opacity': 1})
      })

      return toFlag
    } else {
      this.cy.batch(() => {
        shadowNodes.style({visibility: 'visible'})
        trivials.style({opacity: 1})
        shadowEdges.addClass('shadow')

        cy.elements().removeClass('flag')
        cy.on('zoom', this.reactomeStyle.interactivity.onZoom)
        this.reactomeStyle.interactivity.onZoom()
      })

      return cy.collection()
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

    if (!resource) return;
    if (this.selectedPsicquicResource.value) {
      this.selectedPsicquicResource.reset();
    }
    this.interactorsService.getInteractorData(this.cy, resource).subscribe(interactors => {
      this.interactorsService.addInteractorOccurrenceNode(interactors, this.cy, resource)
    });

    this.state.set('overlay', resource)
  }

  getPsicquicResources() {
    this.interactorsService.getPsicquicResources().subscribe(resources => {
      this.psicquicResources = resources;
    });
  }

  onPsicquicResourceChange(selectedResource: string) {
    this.isDataFromPsicquicLoading = true;
    this.interactorsService.getInteractorData(this.cy, selectedResource).subscribe(interactors => {
      this.interactorsService.addInteractorOccurrenceNode(interactors, this.cy, selectedResource)
      this.isDataFromPsicquicLoading = false;
      this.psicquicSelect?.close();
    })
    this.state.set('overlay', selectedResource)
  }

  openCustomInteractorDialog() {
    const dialogRef = this.dialog.open(CustomInteractorDialogComponent, {
      data: {cy: this.cy},
      restoreFocus: false // Deselect button when closing
    });

    dialogRef.afterClosed().subscribe(result => {
      const resource = dialogRef.componentInstance.resource
      if (resource.token) {
        this.resourceTokens!.push(resource)
      }
      this.cdr.detectChanges();
    })
  }

  deleteResource(resource: Resource) {
    const index = this.resourceTokens!.indexOf(resource);
    if (index !== -1) {
      this.resourceTokens!.splice(index, 1);
      this.cy.elements(`[resource = '${resource.token?.summary.token}']`).remove();
    }
  }

  onCustomResourceChange(resource: Resource) {
    this.interactorsService.sendPostRequest(resource.token!, this.cy).subscribe((result) => {
      this.interactorsService.addInteractorOccurrenceNode(result.interactors, this.cy, result.interactors.resource)
    })
  }
  isSelected(resource: Resource): boolean {
    return this.resourceTokens!.includes(resource);
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
