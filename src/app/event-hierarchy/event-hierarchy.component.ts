import {AfterViewInit, ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import {EventObject} from "../model/event.model";
import {EventService} from "../services/event.service";
import {Species} from "../model/species.model";
import {SpeciesService} from "../services/species.service";
import {BehaviorSubject, Subscription} from "rxjs";
import {NestedTreeControl} from "@angular/cdk/tree";
import {MatTreeNestedDataSource} from "@angular/material/tree";


@Component({
  selector: 'cr-event-hierarchy',
  templateUrl: './event-hierarchy.component.html',
  styleUrls: ['./event-hierarchy.component.scss']
})
export class EventHierarchyComponent implements AfterViewInit, OnDestroy {


  currentSpecies!: Species;
  speciesSubscription!: Subscription;


  dataSource$: BehaviorSubject<EventObject[]>;
  treeControl = new NestedTreeControl<EventObject>(node => node.hasEvent);
  dataSource = new MatTreeNestedDataSource<EventObject>();


  constructor(private eventService: EventService, private speciesService: SpeciesService, private cdr: ChangeDetectorRef) {

    this.dataSource$ = new BehaviorSubject<EventObject[]>([]);
    this.dataSource$.subscribe(items => {
      // @ts-ignore
      this.dataSource.data = null; //todo: check performance issue
      this.dataSource.data = items;
    });


  }

  ngAfterViewInit(): void {
    this.speciesSubscription = this.speciesService.currentSpecies$.subscribe(species => {
      this.currentSpecies = species;
      const taxId = species ? species.taxId : '9606';
      this.getTopLevelPathways(taxId);
    });
  }

  getTopLevelPathways(taxId: string): void {
    this.eventService.fetchTlpBySpecies(taxId).subscribe(result => {
      this.dataSource$.next(result)
    });
  }

  hasChild = (_: number, node: EventObject) => !!node.hasEvent && node.hasEvent.length > 0 || node.schemaClass === 'TopLevelPathway' || node.schemaClass === 'Pathway';

  loadChildNodes(node: EventObject) {
    // Check if children are already loaded
    if (node.hasEvent && node.hasEvent.length > 0) {
      return;
    }

    this.eventService.fetchChildEvents(node.stId).subscribe(children => {
      if (children.hasEvent) {
        node.hasEvent = children.hasEvent;


        //this.dataSource.data = [...this.dataSource.data];  // doesn't work
        //this.dataSource.data = JSON.parse(JSON.stringify(this.dataSource.data)) // fake a change by duplicating the data in another structure with the same content.
        // this.dataSource.data =  null;
        if (!this.treeControl.isExpanded(node)) {
          this.treeControl.expand(node);
        }

        this.dataSource$.next(this.dataSource$.value);

        //this.cdr.detectChanges();
        console.log('final data', this.dataSource.data)
      } else {
        console.log('No children found');
      }
    });
  }


  /** toggle node */
  // toggleNode(node: TreeItem) {
  //   this.treeControl.toggle(node);
  //


  ngOnDestroy(): void {
    this.speciesSubscription.unsubscribe();
    this.dataSource$.complete();
  }
}
