import {AfterViewInit, Component, Input, ViewChild} from '@angular/core';
import {DiagramComponent} from "../diagram/diagram.component";
import {ResourceAndType} from "../interactors/model/interactor.model";
import {InteractorsComponent} from "../interactors/interactors.component";
import {Species} from "../model/species.model";
import {Router} from "@angular/router";


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


  items = ['Autophagy', 'Cell Cycle', 'Cell-Cell communication', 'Developmental Biology', 'Digestion and absorption', 'Disease', 'DNA Repair', 'DNA Replication', 'Drug ADME', 'Extracellular matrix organization',
    'Gene expression (Transcription)', 'Hemostasis', 'Immune System', 'Metabolism', 'Metabolism of proteins', 'Metabolism of RNA', 'Muscle contraction', 'Neuronal System']


  visibility = {
    species: false,
    interactor: false
  }

  constructor(private router: Router) {
  }

  ngAfterViewInit(): void {
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

  updateCurrentInteractorResource(resource: ResourceAndType) {
    this.currentInteractorResource = resource;
  }

  updateCurrentSpecies(species: Species) {
    // abbreviation = HSA, DEL,...
    let abbreviation = species.abbreviation;
    this.diagramId = this.diagramId.replace(/-(.*?)-/, `-${abbreviation}-`);
    this.currentSpecies = species;
    // Navigate to the new URL with the updated diagramId
    return this.router.navigate(['PathwayBrowser', this.diagramId], {
    queryParamsHandling: "preserve" // Keep existing query params
    });
  }

}
