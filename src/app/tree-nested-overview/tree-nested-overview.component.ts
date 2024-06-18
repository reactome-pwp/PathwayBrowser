import {AfterViewInit, Component} from '@angular/core';
import {Event} from "../model/event.model";
import {NestedTreeControl} from "@angular/cdk/tree";
import {TreeDataSource} from "./tree-datassource";
import {EventService} from "../services/event.service";
import {Species} from "../model/species.model";
import {Subscription} from "rxjs";
import {SpeciesService} from "../services/species.service";

@Component({
  selector: 'cr-tree-nested-overview',
  templateUrl: './tree-nested-overview.component.html',
  styleUrls: ['./tree-nested-overview.component.scss']
})
export class TreeNestedOverviewComponent implements AfterViewInit {


  currentSpecies!: Species;
  speciesSubscription!: Subscription;


  treeControl = new NestedTreeControl<Event>(node => node.hasEvent);
  dataSource = new TreeDataSource(this.treeControl, []);

  constructor(private eventService: EventService, private speciesService: SpeciesService) {
  }

  ngAfterViewInit(): void {
    this.speciesSubscription = this.speciesService.currentSpecies$.subscribe(species => {
      this.currentSpecies = species;
      const taxId = species ? species.taxId : '9606';
      this.getTopLevelPathways(taxId);
    });
  }


  getTopLevelPathways(taxId: string): void {
    this.eventService. getEventsHierarchy(taxId).subscribe(result => {
      this.dataSource = new TreeDataSource(this.treeControl, result)
    });
  }

  hasChild = (_: number, node: Event) => !!node.hasEvent && node.hasEvent.length > 0 || ['TopLevelPathway', 'Pathway'].includes(node.schemaClass);

  addChild(node: Event) {
    if (!node.stId) return
    this.eventService.fetchChildEvents(node.stId).subscribe(children => {
      if (children.hasEvent) {
      //  this.dataSource.add(children.hasEvent, node,);
        console.log('final data', this.dataSource.data)
      }
    });
  }
}
