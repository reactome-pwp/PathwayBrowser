import {AfterViewInit, Component, OnDestroy} from '@angular/core';
import {TopLevelPathway} from "../model/event.model";
import {EventService} from "../services/event.service";
import {Species} from "../model/species.model";
import {result} from "lodash";
import {SpeciesService} from "../services/species.service";
import {Subscription} from "rxjs";


@Component({
  selector: 'cr-event-hierarchy',
  templateUrl: './event-hierarchy.component.html',
  styleUrls: ['./event-hierarchy.component.scss']
})
export class EventHierarchyComponent implements AfterViewInit, OnDestroy {

  topLevelPathways: TopLevelPathway[] = []
  currentSpecies!: Species;
  speciesSubscription!: Subscription;

  constructor(private eventService: EventService, private speciesService: SpeciesService) {
  }

  ngAfterViewInit(): void {
    this.speciesSubscription = this.speciesService.currentSpecies$.subscribe(species => {
      if (species) {
        this.currentSpecies = species;
        this.getTopLevelPathway(species.taxId);
      } else {
        this.getTopLevelPathway('9606');
      }
    });
  }

  getTopLevelPathway(taxId: string) {
    this.eventService.fetchTopBySpecies(taxId).subscribe(result => {
        this.topLevelPathways = result;
      }
    )
  }

  ngOnDestroy(): void {
    this.speciesSubscription.unsubscribe();
  }

}
