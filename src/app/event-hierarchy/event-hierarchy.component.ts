import {AfterViewInit, Component, OnDestroy} from '@angular/core';
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
  dataSubscription!: Subscription;


  data$: BehaviorSubject<EventObject[]> = new BehaviorSubject<EventObject[]>([]);
  treeControl = new NestedTreeControl<EventObject>(node => node.hasEvent);
  dataSource = new MatTreeNestedDataSource<EventObject>();


  constructor(private eventService: EventService, private speciesService: SpeciesService) {

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
    this.eventService.fetchTlpBySpecies(taxId).subscribe(result => {
      this.setCurrentData(result);
    });
  }

  hasChild = (_: number, node: EventObject) => !!node.hasEvent && node.hasEvent.length > 0 || ['TopLevelPathway', 'Pathway'].includes(node.schemaClass);

  loadChildNodes(node: EventObject) {
    // Check if children are already loaded
    if (node.hasEvent && node.hasEvent.length > 0) {
      return;
    }

    this.eventService.fetchChildEvents(node.stId).subscribe(children => {
      if (children.hasEvent) {
        node.hasEvent = children.hasEvent;
        this.setCurrentData(this.data$.value);
        //this.dataSource.data = [...this.dataSource.data];  // doesn't work
        if (!this.treeControl.isExpanded(node)) {
          this.treeControl.expand(node);
        }

        console.log('final data', this.dataSource.data)
      } else {
        console.log('No children found');
      }
    });
  }

  ngOnDestroy(): void {
    this.speciesSubscription.unsubscribe();
    this.dataSubscription.unsubscribe();
  }
}
