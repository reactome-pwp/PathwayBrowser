import {ChangeDetectorRef, Component, EventEmitter, Input, Output} from '@angular/core';
import {InteractorToken, PsicquicResource, ResourceType} from "./model/interactor.model";
import cytoscape from "cytoscape";
import {DiagramService} from "../services/diagram.service";
import {DarkService} from "../services/dark.service";
import {InteractorService} from "./services/interactor.service";
import {DiagramStateService} from "../services/diagram-state.service";
import {MatDialog} from "@angular/material/dialog";
import {CustomInteractorDialogComponent} from "./custom-interactor-dialog/custom-interactor-dialog.component";


type ResourceAndType = { name: string | null, type: ResourceType | null }

@Component({
  selector: 'cr-interactors',
  templateUrl: './interactors.component.html',
  styleUrls: ['./interactors.component.scss']
})
export class InteractorsComponent {

  isDataFromPsicquicLoading: boolean = false;
  resourceTokens: InteractorToken[] = [];
  panelOpenState = false;
  clear = false;
  currentResource: ResourceAndType = {name: null, type: null};

  DISEASE_RESOURCE = 'DisGeNet';
  INTACT_RESOURCE = 'IntAct';
  protected readonly ResourceType = ResourceType;

  @Input('cy') cy!: cytoscape.Core;
  @Input('cys') cys: cytoscape.Core[] = [];
  @Input('psicquicResources') psicquicResources!: PsicquicResource[];

  @Output('initialiseReplaceElements') initialiseReplaceElements: EventEmitter<any> = new EventEmitter();
  @Output('currentResourceChange') currentResourceChange: EventEmitter<ResourceAndType> = new EventEmitter<ResourceAndType>();

  constructor(private diagram: DiagramService, public dark: DarkService, private interactorsService: InteractorService, private state: DiagramStateService, public dialog: MatDialog, private cdr: ChangeDetectorRef) {

  }

  getInteractors(resource: string | null, resourceType: ResourceType | undefined) {

    if (resource && resourceType) {
      this.clear = false
      this.updateCurrentResource(resource, resourceType);
    } else {
      return;
    }

    this.cys.forEach(cy => {
      if (this.currentResource.type != ResourceType.CUSTOM && this.currentResource.type != ResourceType.PSICQUIC) {
        this.interactorsService.getInteractorData(cy, resource).subscribe(interactors => {
          this.interactorsService.addInteractorOccurrenceNode(interactors, cy, resource);
          this.initialiseReplaceElements.emit();
        });
      }
      this.state.set('overlay', resource)
    })
  }

  onPsicquicResourceChange(selectedResource: string, resourceType: ResourceType) {
    this.isDataFromPsicquicLoading = true;
    this.clear = false;
    this.updateCurrentResource(selectedResource, resourceType);
    this.cys.forEach(cy => {
      this.interactorsService.getInteractorData(cy, selectedResource).subscribe(interactors => {
        this.interactorsService.addInteractorOccurrenceNode(interactors, cy, selectedResource);
        this.isDataFromPsicquicLoading = false;
        this.state.set('overlay', selectedResource);
      });
    });
  }

  openCustomInteractorDialog() {
    this.cys.forEach(cy => {
      // Avoid multiple opening dialogs
      if (this.dialog.openDialogs.length === 1) {
        return
      }
      const dialogRef = this.dialog.open(CustomInteractorDialogComponent, {
        data: {cy: cy},
        restoreFocus: false // Deselect button when closing
      });

      dialogRef.afterClosed().subscribe(result => {
        const resource = dialogRef.componentInstance.token;
        if (resource) {
          this.resourceTokens!.push(resource);
          this.clear = false;
          this.updateCurrentResource(resource.summary.name, ResourceType.CUSTOM);
          this.state.set('overlay', resource.summary.token);
        }
        this.cdr.detectChanges();
      })
    })
  }

  isSelected(resource: InteractorToken): boolean {
    return this.resourceTokens!.includes(resource);
  }

  onCustomResourceChange(resource: InteractorToken) {
    this.cys.forEach(cy => {
      this.interactorsService.sendPostRequest(resource, cy).subscribe((result) => {
        this.interactorsService.addInteractorOccurrenceNode(result.interactors, cy, result.interactors.resource);
        this.clear = false;
        this.updateCurrentResource(resource!.summary.name, ResourceType.CUSTOM);
        this.state.set('overlay', resource.summary.token);
      })
    })
  }

  deleteResource(resource: InteractorToken) {
    const index = this.resourceTokens!.indexOf(resource);
    if (index !== -1) {
      this.resourceTokens!.splice(index, 1);
      this.cys.forEach(cy => {
        cy.elements(`[resource = '${resource}']`).remove();
        this.state.set('overlay', null);
      })

    }
  }

  clearInteractors() {
    this.cys.forEach(cy => {
      this.interactorsService.clearAllInteractorNodes(cy);
      this.clear = true;
      this.updateCurrentResource(null, null);
      this.state.set('overlay', null);
    })
  }

  updateCurrentResource(name: string | null, type: ResourceType | null) {
    this.currentResource.name = name;
    this.currentResource.type = type;
    this.currentResourceChange.emit(this.currentResource);

  }

}
