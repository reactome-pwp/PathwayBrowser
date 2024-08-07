import {AfterViewInit, Component, Input, OnDestroy} from '@angular/core';
import {Species} from "../model/species.model";
import {SpeciesService} from "../services/species.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";


@Component({
  selector: 'cr-species',
  templateUrl: './species.component.html',
  styleUrls: ['./species.component.scss']
})
export class SpeciesComponent implements AfterViewInit, OnDestroy {
  allSpecies: Species[] = [];
  currentSpecies!: Species;
  currentSpeciesSubscription!: Subscription;

  @Input('id') diagramId: string = '';
  @Input('visibility') visibility = {
    species: false,
    interactor: false
  }

  constructor(private speciesService: SpeciesService, private router: Router, private route: ActivatedRoute) {

  }

  ngAfterViewInit(): void {
    this.getSpecies();

    if (this.diagramId) {
      this.speciesService.setSpeciesFromDiagramId(this.diagramId);
    }

    this.currentSpeciesSubscription = this.speciesService.currentSpecies$.subscribe(species => {
      this.currentSpecies = species;
    });

  }

  ngOnDestroy(): void {
    this.currentSpeciesSubscription.unsubscribe();
  }

  getSpecies() {
    this.speciesService.getSpecies().subscribe(species => {
      // Alphabetical order
      const sortedSpecies = [...species].sort((a, b) => a.displayName.localeCompare(b.displayName))
      sortedSpecies.forEach(s => this.speciesService.setShortName(s))
      this.allSpecies = sortedSpecies;
    })
  }

  onSpeciesChange(species: Species) {
    this.currentSpecies = species;
    this.speciesService.setCurrentSpecies(species);

    // abbreviation = HSA, DEL,...
    let abbreviation = species.abbreviation;
    this.diagramId = this.diagramId.replace(/-(.*?)-/, `-${abbreviation}-`);

    const updatedParams = this.updateQueryParams(['select', 'flag'], abbreviation!);

    // Close the species panel
    setTimeout(() => this.visibility.species = false, 600)

    // Navigate to the new URL with the updated diagramId
    return this.router.navigate(['PathwayBrowser', this.diagramId], {
      // queryParamsHandling: "preserve" // Keep existing query params
      queryParams: updatedParams,
      queryParamsHandling: "merge" // Merges with the existing query params
    });
  }

  updateQueryParams(paramNames: string[], abbreviation: string) {
    const currentParams = {...this.route.snapshot.queryParams};
    paramNames.forEach(param => {
      const value = currentParams[param];
      if (value) {
        return currentParams[param] = value
          .split(',')
          .map((s: string) => s.replace(/-(.*?)-/, `-${abbreviation}-`))
          .join(',');
      }
    })
    return currentParams;
  }

}
