import {AfterViewInit, Component, ElementRef, Input, OnDestroy, Renderer2, ViewChild} from '@angular/core';
import {Event} from "../model/event.model";
import {EventService} from "../services/event.service";
import {SpeciesService} from "../services/species.service";
import {BehaviorSubject, forkJoin, map, mergeMap, of, Subscription, switchMap, tap} from "rxjs";
import {NestedTreeControl} from "@angular/cdk/tree";
import {MatTreeNestedDataSource} from "@angular/material/tree";
import {DiagramStateService} from "../services/diagram-state.service";
import {SplitComponent} from "angular-split";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {Router} from "@angular/router";


@Component({
  selector: 'cr-event-hierarchy',
  templateUrl: './event-hierarchy.component.html',
  styleUrls: ['./event-hierarchy.component.scss']
})
@UntilDestroy()
export class EventHierarchyComponent implements AfterViewInit, OnDestroy {

  @Input('id') diagramId: string = '';
  @Input('eventSplit') split!: SplitComponent
  @ViewChild('button', {read: ElementRef}) button!: ElementRef;


  splitSynchronized!: Subscription
  speciesSubscription!: Subscription;
  treeDataSubscription!: Subscription;
  currentEventSubscription!: Subscription;
  breadcrumbsSubscription!: Subscription;

  treeData$: BehaviorSubject<Event[]> = new BehaviorSubject<Event[]>([]);
  treeControl = new NestedTreeControl<Event, string>(event => event.hasEvent, {trackBy: event => event.stId});
  dataSource = new MatTreeNestedDataSource<Event>();
  breadcrumbs: Event[] = [];

  selectedIdFromUrl = this.state.get('select') || null;
  selectedEvent!: Event;

  // Get latest selected id from URL
  selecting = this.state.onChange.select$.pipe(untilDestroyed(this)).subscribe((value) => {
      this.selectedIdFromUrl = this.state.get('select')
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
      // this.sizeSplit = this.split.getVisibleAreaSizes()[0] as number; // return percent value
      this.adjustWidths();
    });

  }

  /**
   * Adjust widths when loading mat tree data at very beginning.
   */
  adjustWidths() {
    const treeNodes = this.el.nativeElement.querySelectorAll('.mat-tree-node');
    treeNodes.forEach((node: HTMLElement) => {
      this.adjustWidth(node)
    });
  }


  adjustWidth(node: HTMLElement) {
    const left = node.querySelector('.left') as HTMLElement;
    const right = node.querySelector('.right') as HTMLElement;
    const parentWidth = node.clientWidth; // inner width of mat tree node in pixels
    const rightWidth = right.offsetWidth + 10; // 10 is the width of the gradient
    left.style.width = `calc(${parentWidth}px - ${rightWidth}px)`;
  }

  getLeftDivElWidth(node: HTMLElement) {
    const left = node.querySelector('.left') as HTMLElement;
    const right = node.querySelector('.right') as HTMLElement;
    const parentWidth = node.clientWidth; // inner width of mat tree node in pixels
    const rightWidth = right.offsetWidth + 10; // 10 is the width of the gradient
    left.style.width = `calc(${parentWidth}px - ${rightWidth}px)`;
    // console.log('parent ', parentWidth);
    // console.log('right ', rightWidth);
    console.log('single width ', left.style.width);

    return parentWidth - rightWidth;

  }


  getTopLevelPathways(taxId: string): void {
    this.eventService.fetchTlpBySpecies(taxId).subscribe(results => {
      this.setCurrentTreeData(results);
      if (this.diagramId) {
        this.buildTree(this.diagramId);
      }
    });
  }

  hasChild = (_: number, event: Event) => !!event.hasEvent && event.hasEvent.length > 0 || ['TopLevelPathway', 'Pathway', 'CellLineagePath'].includes(event.schemaClass);

  hasChildSingleEvent(event: Event): boolean {
    return this.hasChild(0, event);
  }

  loadChildEvents(event: Event) {
    // Check if children are already loaded
    if (event.hasEvent && event.hasEvent.length > 0) {
      this.setCurrentTreeData(this.treeData$.value);
      return;
    }
    this.eventService.fetchChildEvents(event.stId).subscribe(children => {
      if (children.hasEvent) {
        event.hasEvent = children.hasEvent.map(child => {
          child.parents = [...(event.parents || []), event];
          return child;
        });
        this.setCurrentTreeData(this.treeData$.value);
      } else {
        console.log('No children found');
      }
    });
  }

  buildTree(stId: string) {
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
    console.log('Executing buildNestedTree with data:', roots, 'and ancestors:', ancestors);
    const tree = [...roots];
    const nestedTree = ancestors[0].reduce((acc, event) => {
      return acc.pipe(
        mergeMap(currentLevel => {
          let existingEvent = currentLevel.find(e => e.dbId === event.dbId);
          if (existingEvent) {
            return this.eventService.fetchChildEvents(event.stId).pipe(
              map(children => {
                existingEvent!.hasEvent = children.hasEvent!.map(child => {
                  child.parents = [...(existingEvent!.parents || []), existingEvent!];
                  return child;
                });
                // Highlight selected event
                if (this.selectedIdFromUrl) {
                  existingEvent!.hasEvent?.forEach(event => {
                    if (this.selectedIdFromUrl === event.stId) {
                      event.isSelected = true;
                    }
                  })
                }
                // Highlight selected event's parent when loading from URL
                existingEvent!.isSelected = true;
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

  selectEvent(selectedEvent: Event) {

    this.clearAllSelectedEvents(this.treeData$.value)
    this.selectAllParents(selectedEvent, this.treeData$.value);
    selectedEvent.isSelected = true;

    if (selectedEvent.schemaClass === 'TopLevelPathway') {
      this.eventService.setBreadcrumbs([]);
      this.treeControl.collapseAll();
    }
    this.eventService.setCurrentEvent(selectedEvent);

    this.state.set('select', selectedEvent.stId)


    this.treeControl.expand(selectedEvent);
    this.loadChildEvents(selectedEvent);


    if (selectedEvent.parents) {
      this.eventService.setBreadcrumbs([...(selectedEvent!.parents), selectedEvent]);
    }

    if (this.hasChildSingleEvent(selectedEvent)) {
      this.router.navigate(['PathwayBrowser', selectedEvent.stId], {
        queryParamsHandling: "preserve" // Keep existing query params
      });
    }

  }


  selectAllParents(selectedEvent: Event, events: Event[]) {
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

  clearAllSelectedEvents(events: Event[]) {
    events.forEach(event => {
      event.isSelected = false;
      if (event.hasEvent) {
        this.clearAllSelectedEvents(event.hasEvent);
      }
    });
  }


  trackById(index: number, event: Event): string {
    //todo: test it
    // No need to render again to improve performance
    return event.stId;
  }

  getExpandedEvents() {
    // This returns a list of all selected expanded tree event even for the leaf event
    return this.treeControl.expansionModel.deselect();
  }

  onTagHover(event: Event) {
    if (event.isSelected || (this.treeControl.isExpanded(event) && event.hasEvent)) return;
    event.isHovered = true
  }

  onTagHoverLeave(event: Event) {
    event.isHovered = false;
  }


  currentLeft = 0;

  onNameHover($event: MouseEvent, event: Event) {

    const targetParentNode = ($event.target as HTMLElement).closest('.mat-tree-node') as HTMLElement;
    let leftDivWidth = this.getLeftDivElWidth(targetParentNode);

    const targetElement = $event.target as HTMLElement;
    const contentWidth = targetElement.offsetWidth + 17 + 16; // icon width and padding lef and right

    let left = contentWidth - leftDivWidth;
    //console.log('contentWidth ', contentWidth)
    //console.log('left width', leftDivWidth)
    // Check if there is space between the left and content span
    if (contentWidth > leftDivWidth) {
     // console.log("Applying animation");
      // targetElement.classList.add('animate');
      targetElement.style.left = `-${left}px`; // Set the distance to scroll
      this.currentLeft = -left;
    }
  }

  onNameHoverLeave($event: MouseEvent, event: Event) {
    const targetElement = $event.target as HTMLElement;
    // targetElement.classList.remove('animate');
    targetElement.style.left = '0'; // Reset position
    this.currentLeft = 0;
  }

  onScroll($event: WheelEvent) {
    console.log("start scrolling...")

  }
}
