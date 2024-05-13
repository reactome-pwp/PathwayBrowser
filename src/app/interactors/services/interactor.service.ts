import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import cytoscape, {NodeCollection, NodeSingular} from "cytoscape";
import {map, Observable, switchMap} from "rxjs";
import {Interactor, Interactors, InteractorToken, PsicquicResource} from "../model/interactor-entity.model";


import InteractorsLayout from "../layout/interactors-layout";
import {DiagramService} from "../../services/diagram.service";
import {ResourceType} from "../common/overlay-resource";

@Injectable({
  providedIn: 'root',
})

export class InteractorService {

  private SERVER = "https://dev.reactome.org";
  private PREFIX_INTERACTOR = this.SERVER + "/ContentService/interactors/";
  private PREFIX_DISEASE = this.SERVER + "/overlays/disgenet/";

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


  postContentCache: string = '';
  lastSelectedResource = '';
  selectedNodes: string[] = [];


  constructor(private http: HttpClient, private diagramService: DiagramService) {
  }

  private updatePostContentCache(cy: cytoscape.Core): void {
    this.postContentCache = this.getPostContent(cy);
  }

  private updatePostContentCacheIfNeeded(cy: cytoscape.Core): void {
    if (!this.postContentCache) {
      this.updatePostContentCache(cy);
    }
  }

  public getPostContent(cy: cytoscape.Core) {
    const graphNodes = cy?.nodes(`[graph]`);
    const idToIdentifier = new Map<number, string>(graphNodes?.map(node => [node.data('dbId'), node.data('acc')]));
    const result: string[] = [];

    graphNodes?.forEach(entity => {
      const schemaClass = entity.data("graph").schemaClass;
      if (schemaClass === "EntityWithAccessionedSequence" || schemaClass === "SimpleEntity") {
        result.push(entity.data("acc"));
      }

      if (schemaClass === "Complex" && entity.data("graph").children.length === 1) {
        const identifiers: string[] = entity.data("graph").children.map((id: number) => idToIdentifier.get(id) || '');
        result.push(...identifiers);
      }
    });

    // Concatenate elements from the set values into a single string
    return [...new Set(result)].join(',')

  }

  public getInteractorData(cy: cytoscape.Core, resource: string): Observable<Interactors> {
    this.updatePostContentCacheIfNeeded(cy);
    let url;
    if (resource === ResourceType.STATIC) {
      url = this.STATIC_URL;
    } else if (resource === ResourceType.DISGENET) {
      url = this.DISGENET_URL;
    } else {
      url = this.PSICQUIC_URL + resource.toLowerCase() + '/details'
    }

    return this.http.post<Interactors>(url, this.postContentCache, {
      headers: new HttpHeaders({'Content-Type': 'text/plain'})
    });
  }


  public addInteractorOccurrenceNode(interactors: Interactors, cy: cytoscape.Core, resource: string) {
    if (this.lastSelectedResource && this.lastSelectedResource !== resource) {
      cy.nodes(`[resource='${this.lastSelectedResource}']`).remove();
      cy.edges(`[resource='${this.lastSelectedResource}']`).remove();
      this.createInteractorOccurrenceNode(interactors, cy, resource);
      this.lastSelectedResource = resource;
      this.selectedNodes = [];
    } else if (!this.lastSelectedResource) {
      this.createInteractorOccurrenceNode(interactors, cy, resource);
      this.lastSelectedResource = resource;
      this.selectedNodes = []
    }
  }

  public createInteractorOccurrenceNode(interactors: Interactors, cy: cytoscape.Core, resource: string) {
    const classes = resource === ResourceType.DISGENET ? ['InteractorOccurrences', 'Disease'] : ['InteractorOccurrences'];
    const occurrenceNodes: cytoscape.NodeDefinition[] = [];

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

          if (!entityNode.data("isFadeOut") && !entityNode.classes().includes('Modification')) {
            occurrenceNodes.push({
              data: {
                id: id,
                displayName: interactorEntity.count,
                entity: entityNode,
                interactors: interactorEntity.interactors,
                resource: resource
              },
              classes: classes,
              pannable: true,
              grabbable: false,
              position: pos,
            });
          }
        });
      });
    cy?.add(occurrenceNodes);
  }

  public addInteractorNodes(nodes: cytoscape.NodeCollection, cy: cytoscape.Core) {
    const targetNode = nodes[0]; // Get only one
    const interactorsData = targetNode.data('interactors');
    const resource = targetNode.data('resource')
    InteractorsLayout.BOX_WIDTH = resource === ResourceType.DISGENET ? this.DEFAULT_DISGENET_WIDTH / 2 : this.DEFAULT_INTERACTOR_WIDTH / 2;
    const numberToAdd = InteractorsLayout.getNumberOfInteractorsToDraw(interactorsData)
    const [dynamicInteractors, existingInteractors] = this.getAllInteractors(interactorsData, cy, numberToAdd);
    const allNodes: Interactor[] = [...dynamicInteractors, ...existingInteractors];

    this.createInteractorNodes(dynamicInteractors, targetNode, cy, numberToAdd, resource);
    this.createInteractorEdges(allNodes, targetNode, cy, resource);

    const interactorsToDisplay = cy.nodes(`[source = '${targetNode.id()}']`);
    this.displayInteractors(interactorsToDisplay, targetNode, cy);
  }

  public getAllInteractors(interactorsData: Interactor[], cy: cytoscape.Core, numberToAdd: number) {
    const dynamicInteractors = [];
    const existingInteractors = [];
    let currentSize = 0;
    // get interactors to draw with a provided a number, collect existing interactors for creating edge
    for (const interactor of interactorsData) {
      const diagramNodes = cy?.nodes(`[acc = '${interactor.acc}']`);
      const accToEntityNode = new Map(diagramNodes?.map(node => [node.data('acc'), node]));

      if (interactor.acc !== accToEntityNode.get(interactor.acc)?.data('graph').identifier) {
        dynamicInteractors.push(interactor);
        currentSize++;
        if (currentSize === numberToAdd) break;
      } else {
        existingInteractors.push(interactor);
      }
    }
    return [dynamicInteractors, existingInteractors];
  }

  public createInteractorNodes(interactorsData: Interactor[], targetNode: NodeSingular, cy: cytoscape.Core, numberToAdd: number, resource: string) {
    const interactorNodes: cytoscape.NodeDefinition[] = [];
    const interactorLayout = new InteractorsLayout();

    interactorsData.forEach((interactor: Interactor, index: number) => {
      const position = interactorLayout.getPosition(targetNode, index, numberToAdd)
      const displayName = interactor.alias ? interactor.alias : interactor.acc;
      const defaultType = ['Protein', 'PhysicalEntity'] // Default interactor type for custom resource when there is no type data provided
      const classes = resource === ResourceType.DISGENET ? ['PhysicalEntity', 'DiseaseInteractor'] : [...this.diagramService.nodeTypeMap.get(interactor.type) || defaultType, 'Interactor'];
      let width = resource === ResourceType.DISGENET ? this.DEFAULT_DISGENET_WIDTH : this.DEFAULT_INTERACTOR_WIDTH;
      let height = this.CHAR_HEIGHT + 2 * this.INTERACTOR_PADDING;
      if (interactor.type === 'Gene') height += this.GENE_DECORATION_HEIGHT;

      const id = interactor.acc + '-' + targetNode.data('entity').id();
      interactorNodes.push({
        data: {
          id: id,
          displayName: displayName.replace(/([/,:;-])/g, "$1\u200b"),
          html: this.diagramService.getStructureVideoHtml({id, type:interactor.type},width, height, interactor.acc),
          width: width,
          height: height,
          source: targetNode.id(),
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
    cy?.add(interactorNodes)
  }


  public createInteractorEdges(interactorsData: Interactor[], targetNode: NodeSingular, cy: cytoscape.Core | undefined, resource: string) {

    const resourceClass = resource === ResourceType.DISGENET ? ['Interactor', 'DiseaseInteractor'] : ['Interactor'];

    const interactorEdges: cytoscape.EdgeDefinition[] = [];
    interactorsData.forEach((interactor: Interactor) => {
      const diagramNodes = cy?.nodes(`[acc = '${interactor.acc}']`);
      const accToEntityNode = new Map<string, NodeSingular>(diagramNodes?.map(node => [node.data('acc'), node]));
      const targetNodeId = accToEntityNode.get(interactor.acc) ? accToEntityNode.get(interactor.acc)?.data('id') : interactor.acc + '-' + targetNode.data('entity').id();
      interactorEdges.push({
        data: {
          id: interactor.acc + '---' + targetNode.data('entity').id(),
          source: targetNode.data('entity').id(),
          target: targetNodeId,
          edgeToTarget: targetNode.id(),
          evidenceURLs: interactor.evidencesURL,
          resource: resource
        },
        classes: resourceClass,
        selectable: false
      })
    })
    cy?.add(interactorEdges)
  }

  public displayInteractors(interactorsToDisplay: NodeCollection, targetNode: NodeSingular, cy: cytoscape.Core) {

    let layoutOptions: cytoscape.LayoutOptions = {
      name: 'preset',
      fit: false
    }
    if (this.selectedNodes.includes(targetNode.data('id'))) {
      interactorsToDisplay.remove();
      this.removeInteractorEdges(targetNode, cy);
      this.selectedNodes = this.selectedNodes.filter(item => item !== targetNode.data('id'))
    } else {
      interactorsToDisplay.layout(layoutOptions).run();
      this.selectedNodes.push(targetNode.data('id'))
    }

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
    this.updatePostContentCacheIfNeeded(cy);
    return this.getInteractorToken(name, url, body).pipe(
      switchMap(token => {
        return this.http.post<Interactors>(this.TOKEN_URL + token.summary.token, this.postContentCache, {
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
    this.updatePostContentCacheIfNeeded(cy);
    return this.getInteractorToken(name, url, body).pipe(
      switchMap(token => this.sendPostRequest(token, cy))
    );
  }

  public sendPostRequest(token: InteractorToken, cy: cytoscape.Core): Observable<{
    token: InteractorToken,
    interactors: Interactors
  }> {
    this.updatePostContentCacheIfNeeded(cy);
    return this.http.post<Interactors>(this.TOKEN_URL + token.summary.token, this.postContentCache, {
      headers: new HttpHeaders({'Content-Type': 'text/plain'})
    }).pipe(
      map((interactors) => ({token: token, interactors: interactors}))
    );
  }

   public isCustomResource(resource: string, psiResource : PsicquicResource[]){
    const isFromPSICQUIC =  psiResource.filter(pr => pr.name != ResourceType.STATIC).some(r => r.name === resource)
    return resource != ResourceType.STATIC && resource != ResourceType.DISGENET && !isFromPSICQUIC;
   }
}
