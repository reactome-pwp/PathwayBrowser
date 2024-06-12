import {AfterViewInit, ChangeDetectorRef, Component, Input, OnDestroy, ViewChild} from '@angular/core';
import {DiagramComponent} from "../diagram/diagram.component";
import {ResourceAndType} from "../interactors/model/interactor.model";
import {InteractorsComponent} from "../interactors/interactors.component";
import {Species} from "../model/species.model";
import {ActivatedRoute, Router} from "@angular/router";
import {SpeciesService} from "../services/species.service";
import {InteractorService} from "../interactors/services/interactor.service";
import {Subscription} from "rxjs";


@Component({
  selector: 'cr-viewport',
  templateUrl: './viewport.component.html',
  styleUrls: ['./viewport.component.scss']
})
export class ViewportComponent implements AfterViewInit, OnDestroy {


  @ViewChild('diagram') diagram!: DiagramComponent;
  @ViewChild('interactors') interactors!: InteractorsComponent;
  @Input('id') diagramId: string = '';

  currentInteractorResource: ResourceAndType | undefined = {name: null, type: null};
  currentSpecies!: Species

  currentResourceSubscription!: Subscription;
  currentSpeciesSubscription!: Subscription;


  visibility = {
    species: false,
    interactor: false
  }

  constructor(private router: Router, private route: ActivatedRoute, private speciesService: SpeciesService, private interactorService: InteractorService, private cdRef: ChangeDetectorRef) {
  }

  ngAfterViewInit(): void {

    this.currentSpeciesSubscription = this.speciesService.currentSpecies$.subscribe(species => {
      this.currentSpecies = species;
      // Updated the content after ngAfterContentChecked to avoid ExpressionChangedAfterItHasBeenCheckedError
      this.cdRef.detectChanges();
    });

    this.currentResourceSubscription = this.interactorService.currentInteractorResource$.subscribe(resource => {
      this.currentInteractorResource = resource;
    });
  }

  ngOnDestroy(): void {
    this.currentSpeciesSubscription.unsubscribe();
    this.currentResourceSubscription.unsubscribe();
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
