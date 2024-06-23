import {AfterViewInit, Component, Input, OnDestroy} from '@angular/core';
import {Event} from "../model/event.model";
import {EventService} from "../services/event.service";
import {SpeciesService} from "../services/species.service";
import {BehaviorSubject, forkJoin, map, mergeMap, of, Subscription, switchMap, tap} from "rxjs";
import {NestedTreeControl} from "@angular/cdk/tree";
import {MatTreeNestedDataSource} from "@angular/material/tree";
import {DiagramStateService} from "../services/diagram-state.service";


@Component({
  selector: 'cr-event-hierarchy',
  templateUrl: './event-hierarchy.component.html',
  styleUrls: ['./event-hierarchy.component.scss']
})
export class EventHierarchyComponent implements AfterViewInit, OnDestroy {

  @Input('id') diagramId: string = '';

  speciesSubscription!: Subscription;
  treeDataSubscription!: Subscription;
  currentEventSubscription!: Subscription;

  treeData$: BehaviorSubject<Event[]> = new BehaviorSubject<Event[]>([]);
  treeControl = new NestedTreeControl<Event, string>(node => node.hasEvent, {trackBy: node => node.stId});
  dataSource = new MatTreeNestedDataSource<Event>();

  selectedIds = this.state.get('select') || null;
  selectedEvent!: Event;

  // Get latest selected ids
  selecting = this.state.onChange.select$.subscribe((value) => {
      this.selectedIds = this.state.get('select')
    }
  )

  constructor(private eventService: EventService, private speciesService: SpeciesService, private state: DiagramStateService) {

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

  }

  getTopLevelPathways(taxId: string): void {
    this.eventService.fetchTlpBySpecies(taxId).subscribe(results => {
      this.setCurrentTreeData(results);
      if (this.diagramId) {
        this.buildTree(this.diagramId);
      }
    });
  }

  hasChild = (_: number, node: Event) => !!node.hasEvent && node.hasEvent.length > 0 || ['TopLevelPathway', 'Pathway', 'CellLineagePath'].includes(node.schemaClass);

  loadChildNodes(node: Event) {
    // Check if children are already loaded
    if (node.hasEvent && node.hasEvent.length > 0) {
      return;
    }
    this.eventService.fetchChildEvents(node.stId).subscribe(children => {
      if (children.hasEvent) {
        node.hasEvent = children.hasEvent;
        this.setCurrentTreeData(this.treeData$.value);
        //this.dataSource.data = [...this.dataSource.data];  // doesn't work, see comments above
        if (!this.treeControl.isExpanded(node)) {
          this.treeControl.expand(node);
        }
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
    })
  }

  expandAllAncestors(ancestors: Event[][]) {
    ancestors[0].reverse().forEach(ancestor => this.treeControl.expand(ancestor))
  }


  ngOnDestroy(): void {
    this.speciesSubscription.unsubscribe();
    this.treeDataSubscription.unsubscribe();
    this.currentEventSubscription.unsubscribe();
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
                existingEvent!.hasEvent = children.hasEvent;
                //highlight selected events
                if (this.selectedIds) {
                  existingEvent!.hasEvent?.forEach(node => {
                    if (this.selectedIds.includes(node.stId)) {
                      node.isSelected = true;
                    }
                  })
                }

                //  existingEvent!.isSelected = true;
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

  selectNode(selectedNode: Event) {
    this.deselectAllNodes(this.treeData$.value);
    selectedNode.isSelected = true;
    this.eventService.setCurrentEvent(selectedNode);
    this.expandedNodes = this.getExpandedNodes();
    this.state.set('select', [selectedNode.stId])
  }

  deselectAllNodes(nodes: Event[]) {
    nodes.forEach(node => {
      node.isSelected = false;
      if (node.hasEvent) {
        this.deselectAllNodes(node.hasEvent);
      }
    });
  }


  trackById(index: number, event: Event): string {
   //todo: test it
    return event.stId;
  }

  getExpandedNodes() {
    const expandedNodes = this.treeControl.expansionModel.selected;
    console.log('expanded Nodes ', expandedNodes);
  }

  isHighlighted(node: Event): boolean {
    return this.treeControl.isExpanded(node) || node.isSelected!;
  }

}
