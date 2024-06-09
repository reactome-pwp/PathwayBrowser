import {AfterViewInit, Component, Input, ViewChild} from '@angular/core';
import {DiagramComponent} from "../diagram/diagram.component";
import {ResourceAndType} from "../interactors/model/interactor.model";
import {InteractorsComponent} from "../interactors/interactors.component";
import {Species} from "../model/species.model";
import {ActivatedRoute, Router} from "@angular/router";
import {SpeciesService} from "../services/species.service";
import {InteractorService} from "../interactors/services/interactor.service";


@Component({
  selector: 'cr-viewport',
  templateUrl: './viewport.component.html',
  styleUrls: ['./viewport.component.scss']
})
export class ViewportComponent implements AfterViewInit {


  @ViewChild('diagram') diagram!: DiagramComponent;
  @ViewChild('interactors') interactors!: InteractorsComponent;
  @Input('id') diagramId: string = '';

  currentInteractorResource: ResourceAndType = {name: null, type: null};
  currentSpecies: Species | undefined = undefined;


  visibility = {
    species: false,
    interactor: false
  }

  constructor(private router: Router, private route: ActivatedRoute, private speciesService: SpeciesService, private interactorService: InteractorService) {
  }

  ngAfterViewInit(): void {

    this.speciesService.currentSpecies$.subscribe(species => {
      this.currentSpecies = species;
    });

    this.interactorService.currentInteractorResource$.subscribe(resource => {
      this.currentInteractorResource = resource;
    });
  }

  toggleVisibility(type: string) {
    if (type === 'species') {
      this.visibility.species = !this.visibility.species;
      this.visibility.interactor = false;
    } else if (type === 'interactor') {
      this.visibility.interactor = !this.visibility.interactor;
      this.visibility.species = false;
    }
  }
}
