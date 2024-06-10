import {AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {InteractorToken, PsicquicResource, ResourceAndType, ResourceType} from "./model/interactor.model";
import cytoscape from "cytoscape";
import {DiagramService} from "../services/diagram.service";
import {DarkService} from "../services/dark.service";
import {InteractorService} from "./services/interactor.service";
import {DiagramStateService} from "../services/diagram-state.service";
import {MatDialog} from "@angular/material/dialog";
import {CustomInteractorDialogComponent} from "./custom-interactor-dialog/custom-interactor-dialog.component";
import {Subscription} from "rxjs";


@Component({
  selector: 'cr-interactors',
  templateUrl: './interactors.component.html',
  styleUrls: ['./interactors.component.scss']
})
export class InteractorsComponent implements AfterViewInit, OnDestroy {

  isDataFromPsicquicLoading: boolean = false;
  resourceTokens: InteractorToken[] = [];
  clear = false;
  currentResource: ResourceAndType | undefined = {name: null, type: null};
  psicquicResources: PsicquicResource[] = [];
  currentResourceSubscription!: Subscription;

  DISEASE_RESOURCE = 'DisGeNet';
  INTACT_RESOURCE = 'IntAct';
  protected readonly ResourceType = ResourceType;

  @Input('cy') cy!: cytoscape.Core;
  @Input('cys') cys: cytoscape.Core[] = [];
  @Output('initialiseReplaceElements') initialiseReplaceElements: EventEmitter<any> = new EventEmitter();

  constructor(private diagram: DiagramService, public dark: DarkService, private interactorsService: InteractorService, private state: DiagramStateService, public dialog: MatDialog, private cdr: ChangeDetectorRef) {

  }

  ngAfterViewInit(): void {
    this.getPsicquicResources();
    this.currentResourceSubscription = this.interactorsService.currentInteractorResource$.subscribe(resource => {
      this.currentResource = resource;
    });
  }

  ngOnDestroy(): void {
    this.currentResourceSubscription.unsubscribe()
  }

  getStaticInteractors(resource: string | null) {
    if (resource) {
      this.clear = false
      this.updateCurrentResource(resource);
    } else {
      return;
    }
    this.cys.forEach(cy => {
      this.interactorsService.getInteractorData(cy, resource).subscribe(interactors => {
        this.interactorsService.addInteractorOccurrenceNode(interactors, cy, resource);
        this.initialiseReplaceElements.emit();
      });
      this.state.set('overlay', resource)
    })
  }

  getInteractors(resource: string | null | InteractorToken) {
    if (!resource) return;
    const resourceType = this.interactorsService.getResourceType(resource as string);
    switch (resourceType) {
      case ResourceType.STATIC:
      case ResourceType.DISGENET:
        this.getStaticInteractors(resource as string);
        break;
      case ResourceType.PSICQUIC:
        this.getPsicquicResourceInteractors(resource as string);
        break;
      case ResourceType.CUSTOM:
        this.getCustomResourceInteractors(resource as InteractorToken);
        break;
      default:
        throw new Error("Unknown resource type encountered: " + resourceType);
    }
  }

  getPsicquicResourceInteractors(selectedResource: string) {
    this.isDataFromPsicquicLoading = true;
    this.clear = false;
    this.updateCurrentResource(selectedResource);
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
          this.updateCurrentResource(resource.summary.name);
          this.state.set('overlay', resource.summary.token);
        }
        this.cdr.detectChanges();
      })
    })
  }

  isSelected(resource: InteractorToken): boolean {
    return this.resourceTokens!.includes(resource);
  }

  getCustomResourceInteractors(resource: InteractorToken) {
    this.cys.forEach(cy => {
      this.interactorsService.sendPostRequest(resource, cy).subscribe((result) => {
        this.interactorsService.addInteractorOccurrenceNode(result.interactors, cy, result.interactors.resource);
        this.clear = false;
        this.updateCurrentResource(resource!.summary.name);
        this.state.set('overlay', resource.summary.token);
      })
    })
  }

  deleteCustomResource(resource: InteractorToken) {
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
      this.updateCurrentResource(null);
      this.state.set('overlay', null);
    })
  }

  updateCurrentResource(name: string | null) {
    if (name) {
      const type = this.interactorsService.getResourceType(name);
      const resource: ResourceAndType = {name, type};
      this.interactorsService.setCurrentResource(resource);
    } else {
      this.interactorsService.setCurrentResource({name: null, type: null});
    }
  }

  getPsicquicResources() {
    this.interactorsService.getPsicquicResources().subscribe(resources => {
      this.psicquicResources = resources.filter(r => r.name !== ResourceType.STATIC && r.active);
    });
  }
}
