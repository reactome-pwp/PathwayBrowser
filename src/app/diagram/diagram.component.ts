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
// @ts-ignore
import {Interactivity, ReactomeEvent, Style} from "reactome-cytoscape-style";
import {DarkService} from "../services/dark.service";
import {InteractorService} from "../interactors/services/interactor.service";
import {delay, distinctUntilChanged, filter, Observable, share, Subject, tap} from "rxjs";
import {ReactomeEventTypes} from "../../../projects/reactome-cytoscape-style/src/lib/model/reactome-event.model";
import {PsicquicResource, Resource} from "../interactors/model/interactor-entity.model";
import {MatSelect} from "@angular/material/select";
import {FormControl} from "@angular/forms";
import {DiagramStateService} from "../services/diagram-state.service";
import {UntilDestroy} from "@ngneat/until-destroy";
import {MatDialog} from "@angular/material/dialog";
import {
  CustomInteractorDialogComponent
} from "../interactors/custom-interactor-dialog/custom-interactor-dialog.component";
import {ResourceType} from "../interactors/common/overlay-resource";

@UntilDestroy({checkProperties: true})
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
  fit = true;
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


  @Input('id') diagramId: string = '';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['diagramId']) this.loadDiagram();
  }


  ngAfterViewInit(): void {
    this.dark.$dark.subscribe(this.updateStyle.bind(this))

    const container = this.cytoscapeContainer!.nativeElement;
    const compareContainer = this.compareContainer!.nativeElement;
    const legendContainer = this.legendContainer!.nativeElement;

    Object.values(ReactomeEventTypes).forEach((type) => {
      container.addEventListener(type, (e) => this._reactomeEvents$.next(e as ReactomeEvent))
      compareContainer.addEventListener(type, (e) => this._reactomeEvents$.next(e as ReactomeEvent))
      legendContainer.addEventListener(type, (e) => this._reactomeEvents$.next(e as ReactomeEvent))
    })

    this.reactomeStyle = new Style(container);

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
        this.legend.elements().unselectify().on('click', (event) => {
          event.target.toggleClass('flag')
          this.legend.elements().not(event.target).removeClass('flag')
        })
        this.legend.zoomingEnabled(false);
        this.legend.panningEnabled(false);
        this.legend.minZoom(0)
        const bb = this.legend.elements().boundingBox();
        // this.ratio = bb.w / bb.h;
      });

    this.loadDiagram();

    this.getPsicquicResources();
  }

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

        this.loadCompare(elements, container);

        this.stateToDiagram();
      })
  }


  private loadCompare(elements: cytoscape.ElementsDefinition, container: HTMLDivElement) {
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

      this.reactomeStyle?.bindToCytoscape(this.cyCompare);
      this.cyCompare.minZoom(this.cy!.minZoom())
      this.cyCompare.maxZoom(this.cy!.maxZoom())
      this.updateReplacementVisibility()

      setTimeout(() => {
        this.syncViewports(this.cy!, container, this.cyCompare, compareContainer)
      })
    }
  }

  readonly classRegex = /class:(\w+)([!.]drug)?/

  getElements(tokens: (string | number)[], cy: cytoscape.Core): cytoscape.CollectionArgument {
    let elements: cytoscape.Collection;

    elements = cy.collection()
    tokens.forEach(token => {
      if (typeof token === 'string') {
        if (token.startsWith('R-')) {
          elements = elements.or(`[graph.stId="${token}"]`)
        } else {
          const matchArray = token.match(this.classRegex);
          if (matchArray) {
            const [_, clazz, drug] = matchArray;
            if (drug === '.drug') { // Drug physical entity
              elements = elements.or(`.${clazz}`).and('.drug');
            } else if (drug === '!drug') { // Non drug physical entity
              elements = elements.or(`.${clazz}`).not('.drug');
            } else { // Non physical entity
              elements = elements.or(`.${clazz}`);
            }
          } else {
            elements = elements.or(`[acc=${token}]`)
          }
        }
      } else {
        elements = elements.or(`[acc=${token}]`).or(`[reactomeId=${token}]`)
      }
    });
    return elements;
  }

  select(tokens: (string | number)[], cy: cytoscape.Core): cytoscape.CollectionArgument {
    let selected = this.getElements(tokens, cy);
    selected.select();
    if ("connectedNodes" in selected) {
      selected = selected.add(selected.connectedNodes());
    }

    if (this.fit) {
      cy.fit(selected, 100)
      this.fit = false;
    }

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
        cy.off('zoom', this.reactomeStyle.interactivity.onZoom.shadow)
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
        cy.on('zoom', this.reactomeStyle.interactivity.onZoom.shadow)
        this.reactomeStyle.interactivity.onZoom.shadow()
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


  getInteractors(resource: string, cy: cytoscape.Core = this.cy) {

    if (!resource) return;
    if (this.selectedPsicquicResource.value) {
      this.selectedPsicquicResource.reset();
    }
    this.interactorsService.getInteractorData(cy, resource).subscribe(interactors => {
      this.interactorsService.addInteractorOccurrenceNode(interactors, cy, resource)
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

  // ----- Event Syncing -----

  private _reactomeEvents$: Subject<ReactomeEvent> = new Subject<ReactomeEvent>();
  private _ignore = false;

  @Output()
  public reactomeEvents$: Observable<ReactomeEvent> = this._reactomeEvents$.asObservable().pipe(
    distinctUntilChanged((prev, current) => prev.type === current.type && prev.detail.reactomeId === current.detail.reactomeId),
    tap(e => console.log(e.type, e.detail, e.detail.element.data(), e.detail.cy.container()?.id)),
    filter(() => !this._ignore),
    share()
  );

  stateToDiagramSub = this.state.state$.subscribe(() => this.stateToDiagram());

  private stateToDiagram() {
    for (let cy of [this.cy, this.cyCompare].filter(cy => cy !== undefined)) {
      this.flag(this.state.get('flag'), cy);
      this.select(this.state.get("select"), cy);
      this.getInteractors(this.state.get("overlay"), cy)
    }
  }

  compareBackgroundSync = this.reactomeEvents$.pipe(
    filter(() => this.comparing),
    filter((e) => e.detail.cy !== this.legend)
  ).subscribe(event => {
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
  });

  interactorHandling = this.reactomeEvents$
    .pipe(
      filter((e) => e.detail.cy !== this.legend),
      filter(e => [ReactomeEventTypes.open, ReactomeEventTypes.close].includes(e.type as ReactomeEventTypes)),
      filter(e => e.detail.type === 'Interactor'),
    ).subscribe(e => {
        this.interactorsService.addInteractorNodes(e.detail.element.nodes(), this.cy);
        this.reactomeStyle.interactivity.updateProteins();
        this.reactomeStyle.interactivity.triggerZoom();
      }
    );

  diagram2legend = this.reactomeEvents$.pipe(
    filter((e) => e.detail.cy !== this.legend),
  ).subscribe(event => {
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

  diagramSelect2state = this.reactomeEvents$.pipe(
    filter((e) => e.detail.cy !== this.legend),
    delay(0)
  ).subscribe(e => {
      if (e.type !== ReactomeEventTypes.select) return;
      let elements: cytoscape.NodeSingular = e.detail.element;
      if (e.detail.type === 'reaction') {
        elements = e.detail.cy.elements('node.reaction:selected')
      }
      const reactomeIds = elements.map(el => el.data('graph.stId'));
      this.state.set('select', reactomeIds)
    }
  );

  legend2state = this.reactomeEvents$.pipe(
    filter((e) => e.detail.cy === this.legend),
    filter(() => !this._ignore),
  ).subscribe((e) => {
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

    switch (event.type) {
      case ReactomeEventTypes.open:
        this.state.set('flag', ['class:' + classes[0] + (classes.includes('drug') ? '.' : '!') + 'drug'])
        this.stateToDiagram();
        break;
      case ReactomeEventTypes.close:
        this.state.set('flag', [])
        this.stateToDiagram();
        break;
      case ReactomeEventTypes.hover:
        matchingElement.addClass('hover')
        break;
      case ReactomeEventTypes.leave:
        matchingElement.removeClass('hover')
        break;
    }
  });

  logProteins() {
    console.debug(new Set(this.cy.nodes(".Protein").map(node => node.data("acc") || node.data("iAcc"))))
  }
}
