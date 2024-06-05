import {AfterViewInit, Component, EventEmitter, Output} from '@angular/core';
import {Species} from "../model/species.model";
import {SpeciesService} from "../services/species.service";

@Component({
  selector: 'cr-species',
  templateUrl: './species.component.html',
  styleUrls: ['./species.component.scss']
})
export class SpeciesComponent implements AfterViewInit {


  species: Species[] = [];

  @Output('currentSpeciesChange') currentSpeciesChange: EventEmitter<string> = new EventEmitter<string>();

  constructor(private speciesService: SpeciesService) {

  }

  ngAfterViewInit(): void {
    this.getSpecies();
  }

  getSpecies() {
    this.speciesService.getSpecies().subscribe(species => {
      // Alphabetical order
      const sortedSpecies = [...species].sort((a, b) => a.displayName.localeCompare(b.displayName))
      this.species = sortedSpecies;
    })
  }

  onSpeciesChange(s: Species) {
    const label = this.beautifySpeciesName(s.displayName)
    this.currentSpeciesChange.emit(label);
  }

  beautifySpeciesName(name: string): string {
    const parts = name.split(' ');

    // If there are not exactly two parts, return the original string
    if (parts.length !== 2) {
      throw new Error('Invalid species name format. Expected "Genus species".');
    }

    const genus = parts[0];
    const species = parts[1];
    return `${genus.charAt(0)}.${species}`;
  }


}
