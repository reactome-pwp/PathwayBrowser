import {AfterViewInit, Component, EventEmitter, Input, Output} from '@angular/core';
import {Species} from "../model/species.model";
import {SpeciesService} from "../services/species.service";
import {Router} from "@angular/router";

@Component({
  selector: 'cr-species',
  templateUrl: './species.component.html',
  styleUrls: ['./species.component.scss']
})
export class SpeciesComponent implements AfterViewInit {
  allSpecies: Species[] = [];
  currentSpecies!: Species;

  @Input('id') diagramId: string = '';

  constructor(private speciesService: SpeciesService,private router: Router) {

  }

  ngAfterViewInit(): void {
    this.getSpecies();
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
    // this.currentSpecies = species;
    // Navigate to the new URL with the updated diagramId
    return this.router.navigate(['PathwayBrowser', this.diagramId], {
      queryParamsHandling: "preserve" // Keep existing query params
    });
  }


}
