import {AfterViewInit, ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import {DiagramComponent} from "../diagram/diagram.component";
import {ResourceAndType} from "../interactors/model/interactor.model";
import {InteractorsComponent} from "../interactors/interactors.component";
import {Species} from "../model/species.model";
import {SpeciesService} from "../services/species.service";
import {InteractorService} from "../interactors/services/interactor.service";
import {EhldService} from "../services/ehld.service";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";


@Component({
  selector: 'cr-viewport',
  templateUrl: './viewport.component.html',
  styleUrls: ['./viewport.component.scss']
})
@UntilDestroy()
export class ViewportComponent implements AfterViewInit,OnChanges  {


  @ViewChild('diagram') diagram!: DiagramComponent;
  @ViewChild('interactors') interactors!: InteractorsComponent;
  @Input('id') diagramId: string = '';
  hasEHLD: boolean = false;

  currentInteractorResource: ResourceAndType | undefined = {name: null, type: null};
  currentSpecies: Species | undefined = undefined;

  visibility = {
    species: false,
    interactor: false
  }

  constructor(private speciesService: SpeciesService,
              private interactorService: InteractorService,
              private cdRef: ChangeDetectorRef,
              private ehldService: EhldService
              ) {
  }

  ngAfterViewInit(): void {

   this.speciesService.currentSpecies$.pipe(untilDestroyed(this)).subscribe(species => {
      this.currentSpecies = species;
      // Updated the content after ngAfterContentChecked to avoid ExpressionChangedAfterItHasBeenCheckedError
      this.cdRef.detectChanges();
    });

   this.interactorService.currentInteractorResource$.pipe(untilDestroyed(this)).subscribe(resource => {
      this.currentInteractorResource = resource;
    });

    this.ehldService.hasEHLD$.pipe(untilDestroyed(this)).subscribe((hasEHLD) => {
      this.hasEHLD = hasEHLD;
    });

    if (this.diagramId) {
      this.checkHasEHLD();
    }

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

  private checkHasEHLD(): void {
    this.ehldService.hasEHLD(this.diagramId).subscribe({
        next: (hasEHLD: boolean) => {
          this.hasEHLD = hasEHLD;
          this.ehldService.setHasEHLD(this.hasEHLD);
          this.cdRef.detectChanges();
        },
        error: (error) => {
          console.error('Error fetching EHLD status:', error);
          this.hasEHLD = false;
        }
      }
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['diagramId']) this.checkHasEHLD();
  }



}
