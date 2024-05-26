import {AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, Output} from '@angular/core';
import {ResourceType} from "./common/overlay-resource";
import cytoscape from "cytoscape";
import {DiagramService} from "../services/diagram.service";
import {DarkService} from "../services/dark.service";
import {InteractorService} from "./services/interactor.service";
import {DiagramStateService} from "../services/diagram-state.service";
import {MatDialog} from "@angular/material/dialog";
import {InteractorToken, PsicquicResource} from "./model/interactor-entity.model";
import {CustomInteractorDialogComponent} from "./custom-interactor-dialog/custom-interactor-dialog.component";

@Component({
  selector: 'cr-interactors',
  templateUrl: './interactors.component.html',
  styleUrls: ['./interactors.component.scss']
})
export class InteractorsComponent implements AfterViewInit {

  isDataFromPsicquicLoading: boolean = false;
  resourceTokens : InteractorToken[] = [];
  panelOpenState = false;
  psicquicResources: PsicquicResource[] = []
  activeButton: string | null = null;
  resourceToType: Map<string, ResourceType> = new Map<string, ResourceType>;

  DISEASE_RESOURCE = 'DisGeNet';
  INTACT_RESOURCE = 'IntAct';
  protected readonly ResourceType = ResourceType;

  @Input('cy') cy!: cytoscape.Core;
  @Input('cys') cys: cytoscape.Core[] = [];
  @Output('initialiseReplaceElements') initialiseReplaceElements: EventEmitter<any> = new EventEmitter();

  constructor(private diagram: DiagramService, public dark: DarkService, private interactorsService: InteractorService, private state: DiagramStateService, public dialog: MatDialog, private cdr: ChangeDetectorRef) {
  }

  setActiveButton(resource: string) {
    this.activeButton = resource;
  }


  ngAfterViewInit(): void {
    this.getPsicquicResources()
  }

  getInteractors(resource: string | null, resourceType: ResourceType | null) {

    if (resource && resourceType) {
      this.setActiveButton(resource);
      this.resourceToType.set(resource, resourceType);
    } else {
      return;
    }

    this.cys.forEach(cy => {
      if (this.resourceToType.get(resource) != ResourceType.CUSTOM && this.resourceToType.get(resource) != ResourceType.PSICQUIC) {
        this.interactorsService.getInteractorData(cy, resource).subscribe(interactors => {
          this.interactorsService.addInteractorOccurrenceNode(interactors, cy, resource);
          this.initialiseReplaceElements.emit();
        });
      }
      this.state.set('overlay', resource)
    })
  }

  getPsicquicResources() {
    this.interactorsService.getPsicquicResources().subscribe(resources => {
      this.psicquicResources = resources.filter(r => r.name !== ResourceType.STATIC && r.active);
    });
  }

  onPsicquicResourceChange(selectedResource: string, resourceType: ResourceType) {
    this.isDataFromPsicquicLoading = true;
    this.resourceToType.set(selectedResource, resourceType);
    this.setActiveButton(selectedResource);
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
          this.setActiveButton(resource.summary.token);
          this.resourceToType.set(resource.summary.token, ResourceType.CUSTOM);
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
        this.setActiveButton(resource!.summary.token);
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
      this.setActiveButton('clear');
      this.resourceToType.clear();
      this.state.set('overlay', null);
    })
  }

}
