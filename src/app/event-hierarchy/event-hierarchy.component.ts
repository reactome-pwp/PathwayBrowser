import {AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild} from '@angular/core';
import {Event} from "../model/event.model";
import {EventService} from "../services/event.service";
import {SpeciesService} from "../services/species.service";
import {
  BehaviorSubject,
  combineLatest,
  EMPTY,
  forkJoin,
  fromEvent,
  map,
  mergeMap, Observable,
  of,
  Subscription,
  switchMap,
  tap
} from "rxjs";
import {NestedTreeControl} from "@angular/cdk/tree";
import {MatTreeNestedDataSource} from "@angular/material/tree";
import {DiagramStateService} from "../services/diagram-state.service";
import {SplitComponent} from "angular-split";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {Router} from "@angular/router";
import {isNumber, isString} from "lodash";
import {DiagramComponent} from "../diagram/diagram.component";


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


  splitSynchronized!: Subscription
  speciesSubscription!: Subscription;
  treeDataSubscription!: Subscription;
  currentEventSubscription!: Subscription;
  currentObjSubscription!: Subscription;
  breadcrumbsSubscription!: Subscription;
  windowResizeSubscription!: Subscription;
  subpathwayColorsSubscription!: Subscription;

  treeData$: BehaviorSubject<Event[]> = new BehaviorSubject<Event[]>([]);
  treeControl = new NestedTreeControl<Event, string>(event => event.hasEvent, {trackBy: event => event.stId});
  dataSource = new MatTreeNestedDataSource<Event>();
  breadcrumbs: Event[] = [];
  scrollTimeout: undefined | ReturnType<typeof setTimeout>;
  private _SCROLL_SPEED = 50; // pixels per second
  private _ICON_PADDING = 16;
  private _GRADIENT_WIDTH = 10;
  selectedIdFromUrl = this.state.get('select') || '';
  selectedEvent!: Event;
  selectedObj!: Event;
  subpathwayColors: Map<number, string> = new Map<number, string>();



  constructor(protected eventService: EventService, private speciesService: SpeciesService, private state: DiagramStateService, private el: ElementRef, private router: Router) {
  }

  setCurrentTreeData(events: Event[]) {
    this.treeData$.next(events);
  }

  ngAfterViewInit(): void {

    this.state.onChange.select$.pipe(
      tap(value => this.selectedIdFromUrl = value), // Set selectedIdFromUrl
      switchMap(id => {
        const idToUse = this.selectedIdFromUrl ? this.selectedIdFromUrl : this.diagramId;
        return this.eventService.fetchEnhancedEventData(idToUse)
      }),
      untilDestroyed(this),
    ).subscribe((event) => {
        // Rebuild the tree if we couldn't find it in all visible tree nodes
        const allTreeNodes = this.eventService.getExpandedTreeWithChildrenNodes(this.treeControl, this.dataSource.data);
        console.log('allTreeNodes', allTreeNodes);
        if (!allTreeNodes.map(e => e.stId).includes(event.stId)) {
          console.log("build tree with new event ", event.stId)
          this.buildTree(event, this.diagramId);
        } else {
          // If find it in the tree, then set currentObj as this event
          console.log('fount but set obj and reselect to it', event)
          this.eventService.setCurrentObj(event);
          const siblingEvents = this.selectedEvent.parent?.hasEvent;
          if (siblingEvents) {
            siblingEvents.forEach(siblingEvent => {
              // SiblingEvent's stId matches the target event's stId, select it, otherwise, deselect it
              siblingEvent.isSelected = siblingEvent.stId === event.stId;
            });
          }
        }
      }
    );

    this.speciesSubscription = this.speciesService.currentSpecies$.subscribe(species => {
      const taxId = species ? species.taxId : '9606';
      this.getTopLevelPathways(taxId);
      //this.handleSpeciesChange(taxId);
    });

    this.treeDataSubscription = this.treeData$.subscribe(events => {
      // @ts-ignore
      // Mat tree has a bug causing children to not be rendered in the UI without first setting the data to null
      // This is a workaround to add child data to tree and update the view. see details: https://github.com/angular/components/issues/11381
      this.dataSource.data = null; //todo: check performance issue
      this.dataSource.data = events;
    });

    this.currentEventSubscription = this.eventService.selectedEvent$.subscribe(event => {
      this.selectedEvent = event;
    });

    this.currentObjSubscription = this.eventService.selectedObj$.subscribe(event => {
      this.selectedObj = event;
    });

    this.breadcrumbsSubscription = this.eventService.breadcrumbs$.subscribe(events => {
      this.breadcrumbs = events;
    });

    this.splitSynchronized = this.split.dragProgress$.subscribe(data => {
      this.adjustWidths();
    });

    this.windowResizeSubscription = fromEvent(window, 'resize').subscribe(() => {
      this.adjustWidths();
    });

    this.subpathwayColorsSubscription = this.eventService.subpathwaysColors$.subscribe(colors => {
      this.subpathwayColors = colors;
    })
  }

  // private handleSpeciesChange(taxId: string): void {
  //   this.getTopLevelPathways(taxId).pipe(
  //     switchMap(() => this.eventService.getSelectedTreeEvent(this.selectedIdFromUrl, this.diagramId))
  //   ).subscribe(event => {
  //     this.buildTree(event);
  //   });
  // }

  // private getTopLevelPathways(taxId: string): Observable<Event[]> {
  //   return this.eventService.fetchTlpBySpecies(taxId).pipe(
  //     tap(results => this.setCurrentTreeData(results))
  //   );
  // }

  getTopLevelPathways(taxId: string): void {
    this.eventService.fetchTlpBySpecies(taxId).pipe(
      tap(results => this.setCurrentTreeData(results)),
      switchMap(() => {
        const idToUse = this.selectedIdFromUrl ? this.selectedIdFromUrl : this.diagramId;
        return this.eventService.fetchEnhancedEventData(idToUse);
      })
    ).subscribe(event => {
      this.buildTree(event, this.diagramId);
    });
  }

  buildTree(event: Event, diagramId: string) {
    if (this.eventService.isEntity(event)) {
      this.handleEntity(event, diagramId);
    } else {
      this.handleEvent(event);
    }
  }

  private handleEntity(event: Event, diagramId: string) {
    this.eventService.setCurrentObj(event);
    this.eventService.fetchEnhancedEventData(diagramId).pipe(
      switchMap(() => this.eventService.fetchEventAncestors(diagramId)),
      tap(ancestors => this.processAncestors(ancestors)),
      switchMap(ancestors => this.buildTreeFromAncestors(ancestors))
    ).subscribe(([colors, tree]) => {
      this.setCurrentTreeData(tree);
      this.adjustWidths();
      this.eventService.getExpandedTreeWithChildrenNodes(this.treeControl, this.dataSource.data);
    });
  }

  private handleEvent(event: Event) {
    this.eventService.fetchEventAncestors(event.stId).pipe(
      tap(ancestors => this.processAncestors(ancestors)),
      tap(() => {
        this.eventService.setCurrentObj(event);
      }),
      switchMap(ancestors => this.buildTreeFromAncestors(ancestors))
    ).subscribe(([colors, tree]) => {
      this.setCurrentTreeData(tree);
      this.adjustWidths();
      this.eventService.getExpandedTreeWithChildrenNodes(this.treeControl, this.treeData$.value);
    });
  }

  private processAncestors(ancestors: Event[][]) {
    this.ancestors = ancestors[0];
    this.expandAllAncestors(ancestors);
  }

  private buildTreeFromAncestors(ancestors: Event[][]) {
    return combineLatest([
      this.eventService.subpathwaysColors$,
      this.buildNestedTree(this.treeData$.value, ancestors)
    ]);
  }

  private hasValidAncestors(): boolean {
    return !!(this.ancestors && this.ancestors.length);
  }

  // if a leaf node has sibling which is a root node
  hasRootSiblingForLeafNode(event: Event): boolean {
    if (!event.ancestors || event.ancestors.length === 0) {
      return false;
    }
    const parent = event.parent;
    return !!parent.hasEvent && parent.hasEvent.some(sibling => sibling !== event && this.eventService.eventHasChild(sibling));
  }

  loadChildEvents(event: Event) {
    event.isSelected = this.treeControl.isExpanded(event);
    this.collapseSiblingEvent(event);
    // Check if children are already loaded
    if (event.hasEvent && event.hasEvent.length > 0) {
      this.setCurrentTreeData(this.treeData$.value);
      return;
    }
    this.eventService.fetchEnhancedEventData(event.stId).pipe(
      switchMap(children => {
        if (children.hasEvent) {
          event.hasEvent = children.hasEvent.map(child => {
            child.ancestors = [...(event.ancestors || []), event];
            child.parent = event;
            return child;
          });
          this.setCurrentTreeData(this.treeData$.value);
          // Return the observable for subpathway colors
          return this.eventService.subpathwaysColors$.pipe(
            // If there's no color data, return an empty map
            map(colors => colors || new Map<number, string>())
          );
        }
        return EMPTY;
      }),
      tap((colors) => {
        this.setSubpathwayColors(event, colors);
      }),
      untilDestroyed(this)
    ).subscribe();
  }


  setSubpathwayColors(event: Event, colors: Map<number, string>) {
    if (colors && event.hasEvent) {
      event.hasEvent.forEach(e => {
        if (e.schemaClass === 'Pathway' && !e.hasDiagram) {
          e.color = colors.get(e.dbId);
        }
      });
    }
  }

  expandAllAncestors(ancestors: Event[][]) {
    ancestors[0].reverse().forEach(ancestor => this.treeControl.expand(ancestor))
  }

  ngOnDestroy(): void {
    this.speciesSubscription.unsubscribe();
    this.treeDataSubscription.unsubscribe();
    this.currentEventSubscription.unsubscribe();
    this.splitSynchronized.unsubscribe();
    this.breadcrumbsSubscription.unsubscribe();
    this.windowResizeSubscription.unsubscribe();
    this.subpathwayColorsSubscription.unsubscribe();
    clearTimeout(this.scrollTimeout);
  }


  /**
   * This method is building a nested tree dynamically by giving the roots and ancestors,
   * the currentLevel will always be the TLPs at very beginning,and we find the matched event in ancestors,
   * build the hierarchy structure from parent to child. At the same time, it sends another API call to get children for each item in
   * ancestors.
   * @param roots  TLPs
   * @param ancestors A list of lists of Events, it only contains one list, so we take [0].
   *                  The ancestors is a list of events from child to parent in the API calls,
   *                  But here is from parent to child,no need to use reverse() with ancestors[0]
   */
  buildNestedTree(roots: Event[], ancestors: Event[][]) {
    console.log('BuildNestedTree with data ', roots, 'and ancestors ', ancestors);
    const tree = [...roots];
    const nestedTree = ancestors[0].reduce((acc, event, index, array) => {
      const isLast = index === array.length - 1;
      return acc.pipe(
        mergeMap(currentLevel => {
          const existingEvent = currentLevel.find(e => e.dbId === event.dbId);
          if (existingEvent) {
            return this.eventService.fetchEnhancedEventData(event.stId).pipe(
              map(children => {
                existingEvent.hasEvent = children.hasEvent?.map(child => {
                  child.ancestors = [...(existingEvent.ancestors || []), existingEvent];
                  child.parent = existingEvent;
                  this.eventService.setBreadcrumbs([...child.ancestors])
                  return child;
                });
                // Highlight selected event
                if (this.selectedIdFromUrl) {
                  existingEvent.hasEvent?.forEach(child => {
                    if (this.selectedIdFromUrl === child.stId) {
                      child.isSelected = true;
                      this.eventService.setBreadcrumbs([...(child!.ancestors), child]) //todo: when not loading from URL
                    }
                  })
                }
                // Highlight selected event's parent when loading from URL
                existingEvent.isSelected = true;

                if (existingEvent.stId === this.diagramId) {
                  this.setSubpathwayColors(existingEvent, this.subpathwayColors);
                }

                if (isLast) {
                  this.eventService.setCurrentEvent(existingEvent);
                }

                return existingEvent.hasEvent!;
              })
            );
          } else {
            return of([]);
          }
        })
      );
    }, of(tree))

    return forkJoin([nestedTree]).pipe(
      map(() => {
        return tree;
      })
    );
  }

  onEventSelect(event: Event) {
    const isTLP = event.schemaClass === 'TopLevelPathway';
    const hasChild = this.eventService.eventHasChild(event);
    // Toggle isSelected property if it has children for pathway
    //event.isSelected = hasChild && !isTLP ? !event.isSelected : true;
    event.isSelected = !event.isSelected;
    this.handleEventSelection(event);
  }

  private handleEventSelection(event: Event) {
    if (event.isSelected) {
      this.handleSelection(event);
    } else {
      this.handleDeselection(event);
    }
  }

  onBreadcrumbSelect(navEvent: Event) {
    this.clearAllSelectedEvents(this.treeData$.value);
    this.selectAllParents(navEvent, this.treeData$.value);
    navEvent.isSelected = true;
    // Collapse all descendant nodes except the selected path if it has child events
    this.treeControl.collapseDescendants(navEvent);
    // Expand the path to the selected event
    this.treeControl.expand(navEvent);
    this.updateBreadcrumbs(navEvent);

    this.setDiagramId(navEvent);
    const selectedEventId = this.eventService.eventHasChild(navEvent) && navEvent.hasDiagram ? '' : navEvent.stId;
    this.state.set('select', selectedEventId);
    this.eventService.setCurrentObj(navEvent);
  }


  private handleSelection(event: Event) {
    // First click
    this.clearAllSelectedEvents(this.treeData$.value);
    this.selectAllParents(event, this.treeData$.value);
    this.toggleEventExpansion(event, true);
    this.updateBreadcrumbs(event);
    this.setDiagramId(event);
    this.navigateToPathway(event);
  }


  private handleDeselection(event: Event) {
    // Second click (deselect)
    this.selectAllParents(event, this.treeData$.value);
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
        this.loadChildEvents(event);
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
    // Determine if we should include the selectedEventId in the URL
    const selectedEventId = this.eventService.eventHasChild(event) && event.hasDiagram ? '' : event.stId;
    this.router.navigate(['PathwayBrowser', this.diagramId], {
      queryParamsHandling: "preserve" // Keep existing query params
    }).then(() => {
      this.state.set('select', selectedEventId);
      this.eventService.setCurrentObj(event);
    }).catch(err => {
      throw new Error('Navigation error:', err);
    });
  }


  trackById(index: number, event: Event): string {
    //todo: test it
    // No need to render again to improve performance
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
