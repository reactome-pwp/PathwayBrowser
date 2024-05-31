import {AfterViewInit, Component, Input, ViewChild} from '@angular/core';
import {DiagramComponent} from "../diagram/diagram.component";
import {PsicquicResource, ResourceType} from "../interactors/model/interactor.model";
import {InteractorService} from "../interactors/services/interactor.service";

@Component({
  selector: 'cr-viewport',
  templateUrl: './viewport.component.html',
  styleUrls: ['./viewport.component.scss']
})
export class ViewportComponent  implements  AfterViewInit{


  @ViewChild('diagram') diagram!: DiagramComponent;
  @Input('id') diagramId: string = '';
  psicquicResources: PsicquicResource[] = []

  items = ['Autophagy','Cell Cycle','Cell-Cell communication','Developmental Biology','Digestion and absorption','Disease','DNA Repair','DNA Replication','Drug ADME','Extracellular matrix organization',
  'Gene expression (Transcription)','Hemostasis','Immune System','Metabolism', 'Metabolism of proteins','Metabolism of RNA','Muscle contraction','Neuronal System']


  visibility = {
    species : false,
    interactor : false
  }


  constructor(private interactorsService: InteractorService) {
  }

  ngAfterViewInit(): void {
    this.getPsicquicResources();

  }


  getPsicquicResources() {
    this.interactorsService.getPsicquicResources().subscribe(resources => {
      this.psicquicResources = resources.filter(r => r.name !== ResourceType.STATIC && r.active);
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
