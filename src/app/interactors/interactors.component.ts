import {AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, Output} from '@angular/core';
import {ResourceType} from "./common/overlay-resource";
import cytoscape from "cytoscape";
import {DiagramService} from "../services/diagram.service";
import {DarkService} from "../services/dark.service";
import {InteractorService} from "./services/interactor.service";
import {DiagramStateService} from "../services/diagram-state.service";
import {MatDialog} from "@angular/material/dialog";
import {PsicquicResource, Resource} from "./model/interactor-entity.model";
import {CustomInteractorDialogComponent} from "./custom-interactor-dialog/custom-interactor-dialog.component";

@Component({
  selector: 'cr-interactors',
  templateUrl: './interactors.component.html',
  styleUrls: ['./interactors.component.scss']
})
export class InteractorsComponent implements AfterViewInit {

  isDataFromPsicquicLoading: boolean = false;
  resourceTokens: Resource[] = [];
  panelOpenState = false;
  psicquicResources: PsicquicResource[] = []
  selectedPsicquicResource: string | null = null
  activeButton: string | null = null;
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

  getInteractors(resource: string | null) {
    if (!resource) return;
    this.setActiveButton(resource);
    const isCustom = this.interactorsService.isCustomResource(resource, this.psicquicResources)
    const isPsicquic = this.psicquicResources.filter(pr => pr.name != ResourceType.STATIC).some(r => r.name === this.state.get('overlay'))
    this.cys.forEach(cy => {
      if (!isCustom && !isPsicquic) {
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

  onPsicquicResourceChange(selectedResource: string) {
    this.isDataFromPsicquicLoading = true;
    this.selectedPsicquicResource = selectedResource;
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
        const resource = dialogRef.componentInstance.resource
        if (resource.token) {
          this.resourceTokens!.push(resource)
          this.setActiveButton(resource.token!.summary.token)
          this.state.set('overlay', resource.token.summary.token)
        }
        this.cdr.detectChanges();
      })
    })
  }

  isSelected(resource: Resource): boolean {
    return this.resourceTokens!.includes(resource);
  }

  onCustomResourceChange(resource: Resource) {
    this.interactorsService.sendPostRequest(resource.token!, this.cy).subscribe((result) => {
      this.cys.forEach(cy => {
        this.interactorsService.addInteractorOccurrenceNode(result.interactors, cy, result.interactors.resource);
        this.setActiveButton(resource.token!.summary.token)
        this.state.set('overlay', resource.token!.summary.token);
      })
    })
  }

  deleteResource(resource: Resource) {
    const index = this.resourceTokens!.indexOf(resource);
    if (index !== -1) {
      this.resourceTokens!.splice(index, 1);
      this.cys.forEach(cy => {
        cy.elements(`[resource = '${resource.token?.summary.token}']`).remove();
        this.state.set('overlay', null)
      })

    }
  }

  clearInteractors() {
    this.cys.forEach(cy => {
      this.interactorsService.clearAllInteractorNodes(cy);
      this.setActiveButton('clear');
      this.state.set('overlay', null);
      this.selectedPsicquicResource = null;
    })
  }

}
