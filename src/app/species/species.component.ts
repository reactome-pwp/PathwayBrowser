import {AfterViewInit, Component, EventEmitter, Output} from '@angular/core';
import {Species} from "../model/species.model";
import {SpeciesService} from "../services/species.service";

@Component({
  selector: 'cr-species',
  templateUrl: './species.component.html',
  styleUrls: ['./species.component.scss']
})
export class SpeciesComponent implements AfterViewInit {


  color = "rgb(0, 103, 130)";

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
    this.currentSpeciesChange.emit(s.displayName);
  }
}
