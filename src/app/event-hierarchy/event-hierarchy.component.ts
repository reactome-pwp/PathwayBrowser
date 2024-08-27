import {AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild} from '@angular/core';
import {Event} from "../model/event.model";
import {EventService} from "../services/event.service";
import {SpeciesService} from "../services/species.service";
import {filter, fromEvent, switchMap, take, tap} from "rxjs";
import {NestedTreeControl} from "@angular/cdk/tree";
import {MatTreeNestedDataSource} from "@angular/material/tree";
import {DiagramStateService} from "../services/diagram-state.service";
import {SplitComponent} from "angular-split";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {NavigationEnd, Router} from "@angular/router";


@Component({
  selector: 'cr-event-hierarchy',
  templateUrl: './event-hierarchy.component.html',
  styleUrls: ['./event-hierarchy.component.scss']
})
@UntilDestroy()
export class EventHierarchyComponent implements AfterViewInit, OnDestroy {

  @Input('id') diagramId: string = '';
  @Input('eventSplit') split!: SplitComponent;
  @ViewChild('treeControlButton', {read: ElementRef}) treeControlButton!: ElementRef;
  @ViewChild('eventIcon', {read: ElementRef}) eventIcon!: ElementRef;


  private _SCROLL_SPEED = 50; // pixels per second
  private _ICON_PADDING = 16;
  private _GRADIENT_WIDTH = 10;
  private _ignore = false; // ignore the changes from the tree
  private _isInitialLoad = true; // skip the first load

  treeControl = new NestedTreeControl<Event, string>(event => event.hasEvent, {trackBy: event => event.stId});
  treeDataSource = new MatTreeNestedDataSource<Event>();

  breadcrumbs: Event[] = [];
  scrollTimeout: undefined | ReturnType<typeof setTimeout>;
  selectedIdFromUrl = '';
  selectedTreeEvent!: Event;
  selectedObj!: Event;
  subpathwayColors: Map<number, string> = new Map<number, string>();
  ancestors: Event[] = [];



  constructor(protected eventService: EventService, private speciesService: SpeciesService, private state: DiagramStateService, private el: ElementRef, private router: Router) {
  }

  selecting = this.state.onChange.select$.pipe(
    tap(value => this.selectedIdFromUrl = value),
    filter(value => !this._ignore && !this._isInitialLoad),// Ignore the changes from Tree itself and first load
    switchMap(id => {
      const idToUse = id ? id : this.diagramId;
      return this.eventService.fetchEnhancedEventData(idToUse)
    }),
    untilDestroyed(this),
  ).subscribe((obj) => {
      this.eventService.adjustTreeFromDiagramSelection(obj, this.diagramId, this.selectedTreeEvent, this.subpathwayColors, this.treeControl, this.treeDataSource.data);
    }
  );

  ngAfterViewInit(): void {

    setTimeout(() => {
      this._isInitialLoad = false; // Allow future changes to be processed after first load
    }, 100);

    this.speciesService.currentSpecies$.pipe(untilDestroyed(this)).subscribe(species => {
      const taxId = species ? species.taxId : '9606';
      this.getTopLevelPathways(taxId);
    });

    this.eventService.treeData$.pipe(untilDestroyed(this)).subscribe(events => {
      // @ts-ignore
      // Mat tree has a bug causing children to not be rendered in the UI without first setting the data to null
      // This is a workaround to add child data to tree and update the view. see details: https://github.com/angular/components/issues/11381
      this.treeDataSource.data = null; //todo: check performance issue
      this.treeDataSource.data = events;
      this.adjustWidths();
    });

    this.eventService.selectedTreeEvent$.pipe(untilDestroyed(this)).subscribe(event => {
      this.selectedTreeEvent = event;
    });

    this.eventService.selectedObj$.pipe(untilDestroyed(this)).subscribe(event => {
      this.selectedObj = event;
    });

    this.eventService.breadcrumbs$.pipe(untilDestroyed(this)).subscribe(events => {
      this.breadcrumbs = events;
    });

    this.split.dragProgress$.pipe(untilDestroyed(this)).subscribe(data => {
      this.adjustWidths();
    });

    fromEvent(window, 'resize').pipe(untilDestroyed(this)).subscribe(() => {
      this.adjustWidths();
    });

    this.eventService.subpathwaysColors$.pipe(untilDestroyed(this)).subscribe(colors => {
      this.subpathwayColors = colors;
    })

  }

  getTopLevelPathways(taxId: string): void {
    this.eventService.fetchTlpBySpecies(taxId).pipe(
      tap(results => this.eventService.setTreeData(results)),
      switchMap(() => {
        const idToUse = this.selectedIdFromUrl ? this.selectedIdFromUrl : this.diagramId;
        return this.eventService.fetchEnhancedEventData(idToUse);
      })
    ).subscribe(event => {
      this.eventService.buildTree(event, this.diagramId, this.treeControl, this.subpathwayColors);
    });
  }

  // if a leaf node has sibling which is a root node
  hasRootSiblingForLeafNode(event: Event): boolean {
    if (!event.ancestors || event.ancestors.length === 0) {
      return false;
    }
    const parent = event.parent;
    return !!parent.hasEvent && parent.hasEvent.some(sibling => sibling !== event && this.eventService.eventHasChild(sibling));
  }

  loadChildrenTreeEvents(event: Event) {
    event.isSelected = this.treeControl.isExpanded(event);
    this.collapseSiblingEvent(event);
    // Check if children are already loaded
    if (event.hasEvent && event.hasEvent.length > 0) {
      this.eventService.setTreeData(this.treeDataSource.data);
      return;
    }
    this.eventService.fetchChildrenEvents(event, this.treeDataSource.data).pipe(untilDestroyed(this)).subscribe();
  }

  ngOnDestroy(): void {
    clearTimeout(this.scrollTimeout);
  }

  onEventSelect(event: Event) {
    const isTLP = event.schemaClass === 'TopLevelPathway';
    const hasChild = this.eventService.eventHasChild(event);
    // Toggle isSelected property if it has children for pathway
    //event.isSelected = hasChild && !isTLP ? !event.isSelected : true;
    event.isSelected = !event.isSelected;
    this.handleEventSelectionFromTree(event);
  }

  private handleEventSelectionFromTree(event: Event) {
    if (event.isSelected) {
      this.handleSelectionFromTree(event);
    } else {
      this.handleDeselectionFromTree(event);
    }
  }

  onBreadcrumbSelect(navEvent: Event) {
    this.clearAllSelectedEvents(this.treeDataSource.data);
    this.selectAllParents(navEvent, this.treeDataSource.data);
    navEvent.isSelected = true;
    // Collapse all descendant nodes except the selected path if it has child events
    this.treeControl.collapseDescendants(navEvent);
    // Expand the path to the selected event
    this.treeControl.expand(navEvent);
    this.updateBreadcrumbs(navEvent);

    this.setDiagramId(navEvent);
    const selectedEventId = this.eventService.eventHasChild(navEvent) && navEvent.hasDiagram ? '' : navEvent.stId;
    this._ignore = true;
    this.state.set('select', selectedEventId);
    this._ignore = false;
    this.eventService.setCurrentEventAndObj(navEvent, navEvent);

    const ancestors = navEvent.ancestors ? navEvent.ancestors : [];
    this.eventService.setPath(this.diagramId, ancestors);
  }


  private handleSelectionFromTree(event: Event) {
    // First click
    this.clearAllSelectedEvents(this.treeDataSource.data);
    this.selectAllParents(event, this.treeDataSource.data);
    this.toggleEventExpansion(event, true);
    this.updateBreadcrumbs(event);
    this.setDiagramId(event);
    this.navigateToPathway(event);
  }


  private handleDeselectionFromTree(event: Event) {
    // Second click (deselect)
    this.selectAllParents(event, this.treeDataSource.data);
    this.toggleEventExpansion(event, false);
    this.updateBreadcrumbsForEventDeselection(event);
    this.handlePathwayNavigationOnDeselection(event);
  }

  private toggleEventExpansion(event: Event, expand: boolean) {
    // Collapse all events when selecting any tlps
    if (event.schemaClass === 'TopLevelPathway') {
      this.treeControl.collapseAll();
    }

    if (expand) {
      if (!this.treeControl.isExpanded(event)) {
        this.treeControl.expand(event);
        this.loadChildrenTreeEvents(event);
      }
    } else {
      if (this.treeControl.isExpanded(event)) {
        this.treeControl.collapse(event);
        this.treeControl.collapseDescendants(event);
        event.isSelected = false;
      }
    }

    this.collapseSiblingEvent(event);
  }


  private collapseSiblingEvent(event: Event) {
    if (event.ancestors) {
      // Get 1st parent
      let eventParent = event.parent;
      // Loop through the parent's children to collapse any expanded siblings
      eventParent.hasEvent?.forEach(childEvent => {
        if (childEvent !== event && this.treeControl.isExpanded(childEvent)) {
          this.treeControl.collapse(childEvent);
          this.treeControl.collapseDescendants(childEvent);
          childEvent.isSelected = false;
        }
      })
    }
  }

  private selectAllParents(selectedEvent: Event, events: Event[]) {
    events.forEach(event => {
      event.isSelected = selectedEvent.ancestors?.some(parent => parent.stId === event.stId) || false;
      if (event.hasEvent) {
        this.selectAllParents(selectedEvent, event.hasEvent);
      }
    });
  }

  private clearAllSelectedEvents(events: Event[]) {
    events.forEach(event => {
      event.isSelected = false;
      if (event.hasEvent) {
        this.clearAllSelectedEvents(event.hasEvent);
      }
    });
  }

  private updateBreadcrumbs(event: Event) {
    if (event.schemaClass === 'TopLevelPathway') {
      // If the event is a 'TopLevelPathway', set breadcrumbs to an empty array
      this.eventService.setBreadcrumbs([event]);
    } else if (event.ancestors) {
      // Set breadcrumbs including the event and its parents
      this.eventService.setBreadcrumbs([...(event.ancestors), event]);
    }
  }

  private updateBreadcrumbsForEventDeselection(event: Event) {
    if (event.schemaClass === "TopLevelPathway") {
      this.eventService.setBreadcrumbs([]);
    } else if (event.ancestors?.length) {
      // Update breadcrumb based on the last parent in the parents
      this.updateBreadcrumbs(event.ancestors[event.ancestors.length - 1]);
    }
  }

  private handlePathwayNavigationOnDeselection(event: Event) {
    // pathway and subpathway
    if (this.eventService.eventHasChild(event)) {
      if (event.schemaClass !== 'TopLevelPathway') {
        const eventParent = event.parent;
        const parentWithDiagram = this.getPathwayWithDiagram(event);
        this.diagramId = parentWithDiagram!.stId;
        this.navigateToPathway(eventParent);
      } else {
        this.diagramId = event.stId;
        this.navigateToPathway(event);
      }
    }
  }

  private setDiagramId(event: Event): void {
    // Pathway
    if (this.eventService.eventHasChild(event) && event.hasDiagram) {
      this.diagramId = event.stId;
    } else {
      // Subpathway and reaction
      const parentWithDiagram = this.getPathwayWithDiagram(event);
      this.diagramId = parentWithDiagram!.stId;
    }
  }

  private getPathwayWithDiagram(event: Event): Event | undefined {
    const parents = [...event.ancestors].reverse();
    return parents.find(p => p.hasDiagram);
  }


  private navigateToPathway(event: Event): void {

    const ancestors = event.ancestors ? event.ancestors : [];
    this.eventService.setPath(this.diagramId, ancestors);

    // Determine if we should include the selectedEventId in the URL
    const selectedEventId = this.eventService.eventHasChild(event) && event.hasDiagram ? '' : event.stId;
    this._ignore = true;
    this.router.navigate(['PathwayBrowser', this.diagramId], {
      queryParamsHandling: "preserve" // Keep existing query params
    }).then(() => {
      this.state.set('select', selectedEventId);
      this.eventService.setCurrentEventAndObj(event, event);
      // Listen for NavigationEnd event to reset _ignore
      this.router.events.pipe(
        filter(routerEvent => routerEvent instanceof NavigationEnd),
        take(1) // Take the first NavigationEnd event and unsubscribe automatically
      ).subscribe(() => {
        this._ignore = false;
      });

    }).catch(err => {
      throw new Error('Navigation error:', err);
    });
  }

  trackById(index: number, event: Event): string {
    return event.stId;
  }

  /**
   * Adjust widths when loading mat tree data at the initialization.
   */
  adjustWidths() {
    const treeNodes = this.el.nativeElement.querySelectorAll('.mat-tree-node');
    treeNodes.forEach((node: HTMLElement) => {
      this.adjustWidth(node);
    });
  }

  adjustWidth(node: HTMLElement) {
    const left = node.querySelector('.left') as HTMLElement;
    const hasEvents = left.children.length > 1;
    this.calculateAndSetWidth(node, hasEvents)

  }

  getLeftDivElWidth(node: HTMLElement, event: Event) {
    const hasEvents = this.eventService.eventHasChild(event);
    return this.calculateAndSetWidth(node, hasEvents);
  }


  private calculateAndSetWidth(node: HTMLElement, hasEvents: boolean): number {
    const left = node.querySelector('.left') as HTMLElement;
    const right = node.querySelector('.right') as HTMLElement;
    const parentWidth = node.clientWidth; // inner width of mat tree node in pixels
    const rightWidth = hasEvents ? right.offsetWidth : right.offsetWidth + this._GRADIENT_WIDTH; // 10 is the width of the gradient
    left.style.width = `calc(${parentWidth}px - ${rightWidth}px)`;
    return parentWidth - rightWidth;
  }


  onTagHover(event: Event) {
    if (event.isSelected || (this.treeControl.isExpanded(event) && event.hasEvent)) return;
    event.isHovered = true
  }

  onTagHoverLeave(event: Event) {
    event.isHovered = false;
  }


  onNameHover($event: MouseEvent, event: Event) {
    const targetParentNode = ($event.target as HTMLElement).closest('.mat-tree-node') as HTMLElement;
    const leftDivWidth = this.getLeftDivElWidth(targetParentNode, event);
    const nameElement = $event.target as HTMLElement;
    const contentWidth = this.calculateContentWidth(nameElement, event);
    // Allow animation if this element has been scrolling before
    nameElement.classList.remove('no-transition');
    // Check if there is space between the left and content span
    if (contentWidth > leftDivWidth) {
      let distanceToScroll = contentWidth - leftDivWidth;
      this.setScrollStyles(nameElement, distanceToScroll);
    }
  }

  private calculateContentWidth(targetElement: HTMLElement, event: Event): number {
    const iconWidth = this.eventIcon.nativeElement.getBoundingClientRect().width + this._ICON_PADDING; // width and padding
    const treeControlButtonWidth = this.treeControlButton.nativeElement.getBoundingClientRect().width;
    const baseWidth = targetElement.offsetWidth + iconWidth;
    return this.eventService.eventHasChild(event) ? baseWidth + treeControlButtonWidth : baseWidth;
  }

  private setScrollStyles(targetElement: HTMLElement, distanceToScroll: number): void {
    // Calculate the transition duration based on the distance and the constant speed
    const duration = distanceToScroll / this._SCROLL_SPEED;
    targetElement.style.transition = `left ${duration}s linear`;
    // Set the distance to scroll
    targetElement.style.left = `-${distanceToScroll}px`;
  }

  onNameHoverLeave($event: MouseEvent, event: Event) {
    const nameElement = $event.target as HTMLElement;
    nameElement.style.left = '0'; // Reset position
  }


  onScroll($event: WheelEvent, node: Event) {
    const nameElement = $event.target as HTMLElement;
    this.onScrollStart(nameElement);

    clearTimeout(this.scrollTimeout);

    this.scrollTimeout = setTimeout(() => {
      this.onScrollStop(nameElement);
    }, 500); // Debounce time
  }


  /**
   * Not working with mat tree node
   */
  // private initializeScrollEvent(): void {
  //   this.scrollSubscription = fromEvent(this.displayNameDiv.nativeElement, 'scroll').pipe(
  //     tap(() => this.onScrollStart(this.displayNameDiv.nativeElement)),
  //     debounceTime(200)
  //   ).subscribe(() => {
  //     this.onScrollStop(this.displayNameDiv.nativeElement)
  //   });
  // }

  private onScrollStart(el: HTMLElement): void {
    // Need to make it scrollable to enable the scrolling
    const labelSpan = el.closest('.mdc-button__label') as HTMLElement;
    labelSpan.classList.add('add-overflowX');
    el.classList.add('no-transition');
  }

  private onScrollStop(el: HTMLElement): void {
    const labelSpan = el.closest('.mdc-button__label') as HTMLElement;
    labelSpan.classList.remove('add-overflowX');
    el.classList.remove('no-transition');
  }
}
