import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import cytoscape, {NodeCollection, NodeSingular} from "cytoscape";
import {map, Observable, switchMap} from "rxjs";
import {Interactor, Interactors, InteractorToken, PsicquicResource} from "../model/interactor.model";


import InteractorsLayout from "../layout/interactors-layout";
import {DiagramService} from "../../services/diagram.service";
import {ResourceType} from "../model/interactor.model";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root',
})

export class InteractorService {

  private PREFIX_INTERACTOR = `${environment.host}/ContentService/interactors/`;
  private PREFIX_DISEASE = `${environment.host}/overlays/disgenet/`;

  private STATIC_URL = this.PREFIX_INTERACTOR + 'static/molecules/details';
  private PSICQUIC_RESOURCE_URL = this.PREFIX_INTERACTOR + 'psicquic/resources/'
  private PSICQUIC_URL = this.PREFIX_INTERACTOR + 'psicquic/molecules/';
  public UPLOAD_URL = this.PREFIX_INTERACTOR + 'upload/tuple/';
  public UPLOAD_PSICQUIC_URL = this.PREFIX_INTERACTOR + 'upload/psicquic/url';
  private TOKEN_URL = this.PREFIX_INTERACTOR + 'token/';

  private DISGENET_URL = this.PREFIX_DISEASE + 'findByGenes';

  private readonly DEFAULT_INTERACTOR_WIDTH = 100;
  private readonly DEFAULT_DISGENET_WIDTH = 250
  private readonly INTERACTOR_PADDING = 20;
  private readonly CHAR_WIDTH = 10;
  private readonly CHAR_HEIGHT = 12;
  private readonly GENE_DECORATION_HEIGHT = 20;


  identifiers: string = '';
  cyToSelectedResource = new Map<cytoscape.Core, string>();


  constructor(private http: HttpClient, private diagramService: DiagramService) {
  }

  private getAllIdentifiers(cy: cytoscape.Core): void {
    this.identifiers = this.getIdentifiersFromGraph(cy);
  }

  private updateIdentifiersIfNeeded(cy: cytoscape.Core): void {
    if (!this.identifiers) {
      this.getAllIdentifiers(cy);
    }
  }

  public getIdentifiersFromGraph(cy: cytoscape.Core) {
    const graphNodes = cy?.nodes(`[graph]`);
    const result: string[] = [];

    graphNodes?.forEach(entity => {
      const schemaClass = entity.data("graph").schemaClass;
      if (schemaClass === "EntityWithAccessionedSequence" || schemaClass === "SimpleEntity") {
        result.push(entity.data("acc"));
      }
    });

    // Concatenate elements from the set values into a single string
    return [...new Set(result)].join(',')

  }

  public getInteractorData(cy: cytoscape.Core, resource: string): Observable<Interactors> {
    this.updateIdentifiersIfNeeded(cy);
    let url;
    if (resource === ResourceType.STATIC) {
      url = this.STATIC_URL;
    } else if (resource === ResourceType.DISGENET) {
      url = this.DISGENET_URL;
    } else {
      url = this.PSICQUIC_URL + resource.toLowerCase() + '/details'
    }

    return this.http.post<Interactors>(url, this.identifiers, {
      headers: new HttpHeaders({'Content-Type': 'text/plain'})
    });
  }


  public addInteractorOccurrenceNode(interactors: Interactors, cy: cytoscape.Core, resource: string) {
    if (this.cyToSelectedResource.has(cy) && this.cyToSelectedResource.get(cy) !== resource) {
      const previousResource = this.cyToSelectedResource.get(cy);
      cy.elements(`[resource='${previousResource}']`).remove();
      this.createInteractorOccurrenceNode(interactors, cy, resource);
      this.cyToSelectedResource.set(cy, resource);
    } else if (!this.cyToSelectedResource.has(cy)) {
      this.createInteractorOccurrenceNode(interactors, cy, resource);
      this.cyToSelectedResource.set(cy, resource);
    }
  }

  public createInteractorOccurrenceNode(interactors: Interactors, cy: cytoscape.Core, resource: string) {
    const classes = resource === ResourceType.DISGENET ? ['InteractorOccurrences', 'disease'] : ['InteractorOccurrences'];

    if (interactors.entities === undefined) return;

    interactors.entities
      .filter(interactorEntity => interactorEntity.count > 0)
      .forEach(interactorEntity => {

        const entities = cy?.nodes(`[acc = '${interactorEntity.acc}']`);
        entities?.forEach(entityNode => {

          const pos = {...entityNode.position()};
          pos.x += entityNode.width() / 2;
          pos.y -= entityNode.height() / 2;

          const id = entityNode.id() + '-occ' + '-' + resource.toLowerCase();

          if (!entityNode.classes().includes('Modification')) {
            const occurrenceNode = cy?.add({
              data: {
                ...entityNode.data(),
                id: id,
                displayName: interactorEntity.count,
                entity: entityNode,
                interactors: interactorEntity.interactors,
                resource: resource
              },
              classes: classes,
              pannable: true,
              grabbable: false,
              position: pos
            });

            entityNode.data('occurrence', occurrenceNode);
          }

        });
      });
  }


  public addInteractorNodes(occurrenceNode: cytoscape.NodeSingular, cy: cytoscape.Core) {
    const interactorsData = occurrenceNode.data('interactors');
    const resource = occurrenceNode.data('resource')
    InteractorsLayout.BOX_WIDTH = resource === ResourceType.DISGENET ? this.DEFAULT_DISGENET_WIDTH / 2 : this.DEFAULT_INTERACTOR_WIDTH / 2;
    const numberToAdd = InteractorsLayout.getNumberOfInteractorsToDraw(interactorsData)
    const [dynamicInteractors, existingInteractors] = this.getAllInteractors(interactorsData, cy, numberToAdd);
    const allNodes: Interactor[] = [...dynamicInteractors, ...existingInteractors];
    cy.batch(() => {

      const nodes = this.createInteractorNodes(dynamicInteractors, occurrenceNode, cy, dynamicInteractors.length, resource);
      this.createInteractorEdges(allNodes, occurrenceNode, cy, resource);

      this.displayInteractors(nodes, cy);
    })
  }

  public getAllInteractors(interactorsData: Interactor[], cy: cytoscape.Core, numberToAdd: number) {
    const dynamicInteractors = [];
    const existingInteractors = [];
    // get interactors to draw with a provided a number, collect existing interactors for creating edge
    for (let interactor of interactorsData) {
      const diagramNodes = cy?.nodes(`.PhysicalEntity[acc = '${interactor.acc}']`);

      if (!diagramNodes || diagramNodes.length === 0) {
        dynamicInteractors.push(interactor);
      } else {
        interactor.existingNodes = diagramNodes;
        existingInteractors.push(interactor);
      }
    }

    return [dynamicInteractors.slice(0, numberToAdd), existingInteractors];
  }

  public createInteractorNodes(interactorsData: Interactor[], targetNode: NodeSingular, cy: cytoscape.Core, numberToAdd: number, resource: string) {
    const interactorNodes: cytoscape.NodeDefinition[] = [];
    const interactorLayout = new InteractorsLayout();

    interactorsData.forEach((interactor: Interactor, index: number) => {
      const position = interactorLayout.getPosition(targetNode, index, numberToAdd)
      const displayName = interactor.alias ? interactor.alias : interactor.acc;
      const defaultType = ['Protein', 'PhysicalEntity'] // Default interactor type for custom resource when there is no type data provided
      const classes = resource === ResourceType.DISGENET ? ['PhysicalEntity', 'Interactor', 'disease'] : [...this.diagramService.nodeTypeMap.get(interactor.type) || defaultType, 'Interactor'];
      let width = resource === ResourceType.DISGENET ? this.DEFAULT_DISGENET_WIDTH : this.DEFAULT_INTERACTOR_WIDTH;
      let height = this.CHAR_HEIGHT + 2 * this.INTERACTOR_PADDING;
      if (interactor.type === 'Gene') height += this.GENE_DECORATION_HEIGHT;

      const id = 'interactor-' + interactor.acc;
      interactorNodes.push({
        data: {
          ...targetNode.data(),
          id: id,
          displayName: displayName.replace(/([/,:;-])/g, "$1\u200b"),
          html: this.diagramService.getStructureVideoHtml({id, type: interactor.type}, width, height, interactor.acc),
          width: width,
          height: height,
          accURL: interactor.accURL,
          score: interactor.score,
          evidences: interactor.evidences,
          evidenceURLs: interactor.evidencesURL,
          resource: resource
        },
        classes: classes,
        position: position,
        selectable: false
      })
    })
    return cy?.add(interactorNodes)
  }


  public createInteractorEdges(interactorsData: Interactor[], occurrenceNode: NodeSingular, cy: cytoscape.Core | undefined, resource: string) {
    if (!cy) return

    const resourceClass = resource === ResourceType.DISGENET ? ['Interactor', 'disease'] : ['Interactor'];

    const interactorEdges: cytoscape.EdgeDefinition[] = [];
    interactorsData.forEach((interactor: Interactor) => {
      const entity = occurrenceNode.data('entity');
      const targetNodes = interactor.existingNodes ? interactor.existingNodes : [cy.getElementById('interactor-' + interactor.acc)];
      targetNodes.forEach(targetNode => {
        interactorEdges.push({
          data: {
            ...targetNode.data(),
            id: interactor.acc + '-' + entity.id(),
            source: entity.id(),
            target: targetNode.id(),
            edgeToTarget: occurrenceNode.id(),
            evidenceURLs: interactor.evidencesURL,
            resource: resource
          },
          classes: resourceClass,
          selectable: false
        })
      })

    })
    cy?.add(interactorEdges)
  }

  public displayInteractors(interactorsToDisplay: NodeCollection, cy: cytoscape.Core) {

    let layoutOptions: cytoscape.LayoutOptions = {
      name: 'preset',
      fit: false
    }
    interactorsToDisplay.layout(layoutOptions).run();
  }

  public removeInteractorNodes(occurrenceNode: cytoscape.NodeSingular) {
    const entityNode = occurrenceNode.data('entity');
    const interactors = entityNode.closedNeighborhood('node.Interactor');

    entityNode.connectedEdges('.Interactor').remove();
    interactors.forEach((interactor: cytoscape.NodeSingular) => {
      if (interactor.connectedEdges().empty()) {
        interactor.remove()
      }
    })
  }

  public clearAllInteractorNodes(cy: cytoscape.Core) {
    this.cyToSelectedResource.clear();
    const interactorOcc = cy.elements(`.InteractorOccurrences`).remove();
    interactorOcc.forEach(node => {
      if (node.hasClass('opened')) {
        this.removeInteractorNodes(node)
      }
    })
  }

  public removeInteractorEdges(targetNode: cytoscape.NodeSingular, cy: cytoscape.Core) {
    const edgesToRemove = cy.edges(`[edgeToTarget = '${targetNode.id()}']`);
    edgesToRemove.remove();
  }

  public getPsicquicResources(): Observable<PsicquicResource[]> {
    return this.http.get<PsicquicResource[]>(this.PSICQUIC_RESOURCE_URL, {
      headers: new HttpHeaders({'Content-Type': 'application/json;charset=UTF-8'})
    });
  }

  public getInteractorToken(name: string, url: string, body: string | FormData) {
    return this.http.post<InteractorToken>(url, body, {
      params: new HttpParams().set('name', name),
    })
  }


  public getInteractorsWithToken(name: string, url: string, body: string | FormData, cy: cytoscape.Core): Observable<{
    token: InteractorToken,
    interactors: Interactors
  }> {
    this.updateIdentifiersIfNeeded(cy);
    return this.getInteractorToken(name, url, body).pipe(
      switchMap(token => {
        return this.http.post<Interactors>(this.TOKEN_URL + token.summary.token, this.identifiers, {
          headers: new HttpHeaders({'Content-Type': 'text/plain'})
        }).pipe(
          map((interactors) => ({token: token, interactors: interactors}))
        );
      })
    );
  }

  public getInteractorsFromToken(name: string, url: string, body: string | FormData, cy: cytoscape.Core): Observable<{
    token: InteractorToken,
    interactors: Interactors
  }> {
    this.updateIdentifiersIfNeeded(cy);
    return this.getInteractorToken(name, url, body).pipe(
      switchMap(token => this.sendPostRequest(token, cy))
    );
  }

  public sendPostRequest(token: InteractorToken, cy: cytoscape.Core): Observable<{
    token: InteractorToken,
    interactors: Interactors
  }> {
    this.updateIdentifiersIfNeeded(cy);
    return this.http.post<Interactors>(this.TOKEN_URL + token.summary.token, this.identifiers, {
      headers: new HttpHeaders({'Content-Type': 'text/plain'})
    }).pipe(
      map((interactors) => ({token: token, interactors: interactors}))
    );
  }

  public isCustomResource(resource: string, psiResource: PsicquicResource[]) {
    const isFromPSICQUIC = psiResource.filter(pr => pr.name != ResourceType.STATIC).some(r => r.name === resource)
    return resource != ResourceType.STATIC && resource != ResourceType.DISGENET && !isFromPSICQUIC;
  }
}
