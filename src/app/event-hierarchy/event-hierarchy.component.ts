import {AfterViewInit, ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {EventObject} from "../model/event.model";
import {EventService} from "../services/event.service";
import {SpeciesService} from "../services/species.service";
import {BehaviorSubject, forkJoin, map, mergeMap, of, Subscription, switchMap, take, tap} from "rxjs";
import {NestedTreeControl} from "@angular/cdk/tree";
import {MatTreeNestedDataSource} from "@angular/material/tree";


@Component({
  selector: 'cr-event-hierarchy',
  templateUrl: './event-hierarchy.component.html',
  styleUrls: ['./event-hierarchy.component.scss']
})
export class EventHierarchyComponent implements AfterViewInit, OnInit, OnDestroy {

  @Input('id') diagramId: string = '';

  speciesSubscription!: Subscription;
  dataSubscription!: Subscription;


  data$: BehaviorSubject<EventObject[]> = new BehaviorSubject<EventObject[]>([]);
  treeControl = new NestedTreeControl<EventObject, string>(node => node.hasEvent, {trackBy: node => node.stId});
  dataSource = new MatTreeNestedDataSource<EventObject>();


  constructor(private eventService: EventService, private speciesService: SpeciesService, private cdRef: ChangeDetectorRef) {

  }

  setCurrentData(data: EventObject[]) {
    this.data$.next(data);
  }

  ngAfterViewInit(): void {
    this.speciesSubscription = this.speciesService.currentSpecies$.subscribe(species => {
      this.currentSpecies = species;
      const taxId = species ? species.taxId : '9606';
      this.getTopLevelPathways(taxId);
    });

    this.dataSubscription = this.data$.subscribe(items => {
      // @ts-ignore
      // Mat tree has a bug causing children to not be rendered in the UI without first setting the data to null
      // This is a workaround to add child data to tree and update the view. see details: https://github.com/angular/components/issues/11381
      this.dataSource.data = null; //todo: check performance issue
      this.dataSource.data = items;
    });
  }

  getTopLevelPathways(taxId: string): void {
    this.eventService.fetchTlpBySpecies(taxId).subscribe(results => {
      this.setCurrentData(results);
      if (this.diagramId) {
        this.buildTree(this.diagramId);
      }
    });
  }

  hasChild = (_: number, node: EventObject) => !!node.hasEvent && node.hasEvent.length > 0 || ['TopLevelPathway', 'Pathway', 'CellLineagePath'].includes(node.schemaClass);

  loadChildNodes(node: EventObject) {
    // Check if children are already loaded
    if (node.hasEvent && node.hasEvent.length > 0) {
      return;
    }
    this.eventService.fetchChildEvents(node.stId).subscribe(children => {
      if (children.hasEvent) {
        node.hasEvent = children.hasEvent;
        this.setCurrentData(this.data$.value);
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
          return this.buildNestedTree(this.data$.value, ancestors)
        })
      ).subscribe((tree) => {
      this.setCurrentData(tree);
    })
  }

  expandAllAncestors(ancestors: EventObject[][]) {
    ancestors[0].reverse().forEach(ancestor => this.treeControl.expand(ancestor))
  }


  ngOnDestroy(): void {
    this.speciesSubscription.unsubscribe();
    this.dataSubscription.unsubscribe();
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
  buildNestedTree(roots: EventObject[], ancestors: EventObject[][]) {
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

}
