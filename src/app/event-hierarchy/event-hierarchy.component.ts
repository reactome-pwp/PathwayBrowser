import {AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild} from '@angular/core';
import {Event} from "../model/event.model";
import {EventService} from "../services/event.service";
import {SpeciesService} from "../services/species.service";
import {BehaviorSubject, forkJoin, fromEvent, map, mergeMap, of, Subscription, switchMap, tap} from "rxjs";
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
  @Input('diagram') diagram!: DiagramComponent;
  @ViewChild('treeControlButton', {read: ElementRef}) treeControlButton!: ElementRef;
  @ViewChild('eventIcon', {read: ElementRef}) eventIcon!: ElementRef;


  splitSynchronized!: Subscription
  speciesSubscription!: Subscription;
  treeDataSubscription!: Subscription;
  currentEventSubscription!: Subscription;
  breadcrumbsSubscription!: Subscription;
  windowResizeSubscription!: Subscription;

  treeData$: BehaviorSubject<Event[]> = new BehaviorSubject<Event[]>([]);
  treeControl = new NestedTreeControl<Event, string>(event => event.hasEvent, {trackBy: event => event.stId});
  dataSource = new MatTreeNestedDataSource<Event>();
  breadcrumbs: Event[] = [];
  scrollTimeout: undefined | ReturnType<typeof setTimeout>;
  private _SCROLL_SPEED = 50; // pixels per second
  selectedIdFromUrl = this.state.get('select') || '';
  selectedEvent!: Event;

  // Get latest selected id from URL
  selecting = this.state.onChange.select$.pipe(untilDestroyed(this)).subscribe((value) => {
      if (this.diagram) {
        this.diagram.fit = true;
        this.selectedIdFromUrl = value;
      }
    }
  )

  constructor(private eventService: EventService, private speciesService: SpeciesService, private state: DiagramStateService, private el: ElementRef, private router: Router) {
  }

  setCurrentTreeData(events: Event[]) {
    this.treeData$.next(events);
  }

  ngAfterViewInit(): void {
    this.speciesSubscription = this.speciesService.currentSpecies$.subscribe(species => {
      const taxId = species ? species.taxId : '9606';
      this.getTopLevelPathways(taxId);
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


    this.breadcrumbsSubscription = this.eventService.breadcrumbs$.subscribe(events => {
      this.breadcrumbs = events;
    });

    this.splitSynchronized = this.split.dragProgress$.subscribe(data => {
      this.adjustWidths();
    });

    this.windowResizeSubscription = fromEvent(window, 'resize').subscribe(() => {
      this.adjustWidths();
    });
  }

  getTopLevelPathways(taxId: string): void {
    this.eventService.fetchTlpBySpecies(taxId).subscribe(results => {
      this.setCurrentTreeData(results);
      const id = this.selectedIdFromUrl ? this.selectedIdFromUrl : this.diagramId;
      this.buildTree(id);
    });
  }

  hasChild = (_: number, event: Event) => !!event.hasEvent && event.hasEvent.length > 0 || ['TopLevelPathway', 'Pathway', 'CellLineagePath'].includes(event.schemaClass);

  eventHasChild(event: Event): boolean {
    return this.hasChild(0, event);
  }

  hasParentSibling(event: Event): boolean {
    if (!event.parents || event.parents.length === 0) {
      return false;
    }
    // Direct parent
    const parent = event.parents[event.parents.length - 1];
    return !!parent.hasEvent && parent.hasEvent.some(sibling => sibling !== event && this.eventHasChild(sibling));
  }


  loadChildEvents(event: Event) {
    event.isSelected = this.treeControl.isExpanded(event);
    this.collapseSiblingEvent(event);
    // Check if children are already loaded
    if (event.hasEvent && event.hasEvent.length > 0) {
      this.setCurrentTreeData(this.treeData$.value);
      return;
    }
    this.eventService.fetchEnhancedEventData(event.stId).subscribe(children => {
      if (children.hasEvent) {
        event.hasEvent = children.hasEvent.map(child => {
          child.parents = [...(event.parents || []), event];
          return child;
        });
        this.setCurrentTreeData(this.treeData$.value);
      } else {
        console.log('No children found'); //todo: delete it
      }
    });
  }

  buildTree(stId: string | number) {
    this.eventService.fetchEventAncestors(stId)
      .pipe(
        tap(ancestors => {
          this.expandAllAncestors(ancestors);
        }),
        switchMap(ancestors => {
          return this.buildNestedTree(this.treeData$.value, ancestors)
        })
      ).subscribe((tree) => {
      this.setCurrentTreeData(tree);
      this.adjustWidths();
    })
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
          let existingEvent = currentLevel.find(e => e.dbId === event.dbId);
          if (existingEvent) {
            return this.eventService.fetchEnhancedEventData(event.stId).pipe(
              map(children => {
                existingEvent!.hasEvent = children.hasEvent?.map(child => {
                  child.parents = [...(existingEvent!.parents || []), existingEvent!];
                  this.eventService.setBreadcrumbs([...child.parents])
                  return child;
                });
                // Highlight selected event
                if (this.selectedIdFromUrl) {
                  existingEvent!.hasEvent?.forEach(event => {
                    if (this.selectedIdFromUrl === event.stId) {
                      event.isSelected = true;
                      this.eventService.setBreadcrumbs([...(event!.parents), event]) //todo: when not loading from URL
                    }
                  })
                }
                // Highlight selected event's parent when loading from URL
                existingEvent!.isSelected = true;
                if (isLast) {
                  this.eventService.setCurrentEvent(existingEvent!);
                }

                return existingEvent!.hasEvent!;
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
    if (this.eventHasChild(event) && event.schemaClass !== 'TopLevelPathway') {
      // Toggle isSelected property if it has children for pathway
      event.isSelected = !event.isSelected;
    } else {
      // Select without toggle if it doesn't have children for reaction
      event.isSelected = true;
    }
    if (event.isSelected) {
      this.handleSelection(event)
    } else {
      this.handleDeselection(event)
    }
  }


  onBreadcrumbSelect(navEvent: Event) {
    this.clearAllSelectedEvents(this.treeData$.value);
    this.selectAllParents(navEvent, this.treeData$.value);
    navEvent.isSelected = true;
    // Collapse all nodes except the selected path if it has child events
    this.treeControl.collapseDescendants(navEvent);
    // Expand the path to the selected event
    this.treeControl.expand(navEvent);

    if (navEvent.schemaClass !== 'TopLevelPathway' && navEvent.parents) {
      this.eventService.setBreadcrumbs([...(navEvent.parents), navEvent]);
    } else {
      this.eventService.setBreadcrumbs([])
    }

    this.setDiagramId(navEvent);
    this.navigateToPathway(navEvent);
  }


  private handleSelection(event: Event) {
    // First click
    this.clearAllSelectedEvents(this.treeData$.value);
    this.selectAllParents(event, this.treeData$.value);
    this.toggleEventExpansion(event, true);

    if (event.parents) {
      this.eventService.setBreadcrumbs([...(event.parents), event]);
    }

    this.setDiagramId(event);
    this.navigateToPathway(event);
  }

  private handleDeselection(event: Event) {
    // Second click (deselect)
    this.selectAllParents(event, this.treeData$.value);
    this.toggleEventExpansion(event, false);

    if (event.parents) {
      this.eventService.setBreadcrumbs([...(event.parents)]);
    }

    //pathway and subpathway
    if (this.eventHasChild(event)) {
      if (event.schemaClass !== 'TopLevelPathway') {
        const parent = event.parents[event.parents.length - 1]
        const parentWithDiagram = this.findParentWithDiagram(event);
        this.diagramId = parentWithDiagram!.stId;
        this.navigateToPathway(parent);
      } else {
        this.diagramId = event.stId;
        this.navigateToPathway(event);
      }
    }
  }

  private toggleEventExpansion(event: Event, expand: boolean) {
    // Collapse all events when selecting any tlps
    if (event.schemaClass === 'TopLevelPathway') {
      this.eventService.setBreadcrumbs([]);
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
    if (event.parents) {
      // Get 1st parent
      let directParent = event.parents[event.parents.length - 1];
      // Loop through the parent's children to collapse any expanded siblings
      directParent.hasEvent?.forEach(childEvent => {
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
      if (selectedEvent.parents) {
        const parentIds = selectedEvent.parents.map(parent => parent.stId);
        event.isSelected = parentIds.includes(event.stId)
      }
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


  private setDiagramId(event: Event): void {
    // Pathway
    if (this.eventHasChild(event) && event.hasDiagram) {
      this.diagramId = event.stId;
    } else {
      // Subpathway and reaction
      const parentWithDiagram = this.findParentWithDiagram(event);
      this.diagramId = parentWithDiagram!.stId;
    }
  }

  private findParentWithDiagram(event: Event): Event | undefined {
    const parents = [...event.parents].reverse();
    return parents.find(p => p.hasDiagram);
  }


  private navigateToPathway(event: Event): void {
    const selectedEventId = this.eventHasChild(event) && event.hasDiagram ? '' : event.stId;
    this.router.navigate(['PathwayBrowser', this.diagramId], {
      queryParamsHandling: "preserve" // Keep existing query params
    }).then(() => {
      this.state.set('select', selectedEventId);
      this.eventService.setCurrentEvent(event);
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
    const hasEvents = this.eventHasChild(event);
    return this.calculateAndSetWidth(node, hasEvents);
  }


  private calculateAndSetWidth(node: HTMLElement, hasEvents: boolean): number {
    const left = node.querySelector('.left') as HTMLElement;
    const right = node.querySelector('.right') as HTMLElement;
    const parentWidth = node.clientWidth; // inner width of mat tree node in pixels
    const rightWidth = hasEvents ? right.offsetWidth : right.offsetWidth + 10; // 10 is the width of the gradient
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
    const iconWidth = this.eventIcon.nativeElement.getBoundingClientRect().width + 16; // width and padding
    const treeControlButtonWidth = this.treeControlButton.nativeElement.getBoundingClientRect().width;
    const baseWidth = targetElement.offsetWidth + iconWidth;
    return this.eventHasChild(event) ? baseWidth + treeControlButtonWidth : baseWidth;
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


  private flattenTree(data: Event[]): Event[] {
    const flatTreeData: Event[] = [];

    const flatten = (nodes: Event[]) => {
      nodes.forEach(node => {
        flatTreeData.push(node);
        if (node.hasEvent) {
          flatten(node.hasEvent);
        }
      });
    };

    flatten(data);
    return flatTreeData;
  }

  private findSelectedEvent(data: Event[], id: string | number): Event | null {
    for (let event of data) {
      if (isNumber(id) && event.dbId === id) {
        return event;
      }
      if (isString(id) && event.stId === id) {
        return event;
      }
      if (event.hasEvent) {
        const found = this.findSelectedEvent(event.hasEvent, id);
        if (found) {
          return found;
        }
      }
    }
    return null;
  }


  findEvent(stId: string | number) {
    const flatData = this.flattenTree(this.treeData$.value);

    if (isString(stId)) {
      return flatData.find(node => node.stId === stId);
    }
    if (isNumber(stId)) {
      return flatData.find(node => node.dbId === stId);
    }
    return null;
  }


}
