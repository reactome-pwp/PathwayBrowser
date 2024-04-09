import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import cytoscape from "cytoscape";
import {Observable} from "rxjs";
import {Interactors} from "../model/interactor-entity.model";

@Injectable({
  providedIn: 'root',
})

export class InteractorService {

  private postContentCache: string = '';
  private INTACT = 'IntAct';

  constructor(private http: HttpClient) {
  }

  private updatePostContentCache(cy: cytoscape.Core): void {
    this.postContentCache = this.getPostContent(cy);
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

  public getStaticInteractorData(cy: cytoscape.Core): Observable<Interactors> {

    if (!this.postContentCache) {
      this.updatePostContentCache(cy);
    }
    // const postContent = this.getPostContent(cy)
    return this.http.post<Interactors>('https://dev.reactome.org/ContentService/interactors/static/molecules/details', this.postContentCache, {
      headers: new HttpHeaders({'Content-Type': 'text/plain'})
    });
  }

  public getDiseaseInteractorData(cy: cytoscape.Core): Observable<Interactors> {

    if (!this.postContentCache) {
      this.updatePostContentCache(cy);
    }
    // const postContent = this.getPostContent(cy)
    return this.http.post<Interactors>('https://dev.reactome.org/overlays/disgenet/findByGenes', this.postContentCache, {
      headers: new HttpHeaders({'Content-Type': 'text/plain'})
    });
  }

  lastSelectedResource: string | undefined
  public addInteractorOccurrenceNode(interactors: Interactors, cy: cytoscape.Core, resource: string) {
    if (this.lastSelectedResource && this.lastSelectedResource !== resource) {
      cy.nodes(`[resource='${this.lastSelectedResource}']`).remove();
      cy.edges(`[resource='${this.lastSelectedResource}']`).remove();
      this.createInteractorOccurrenceNode(interactors, cy, resource);
      this.lastSelectedResource = resource;
    } else if (!this.lastSelectedResource) {
      this.createInteractorOccurrenceNode(interactors, cy, resource);
      this.lastSelectedResource = resource;
    }
  }

  public createInteractorOccurrenceNode(interactors: Interactors, cy: cytoscape.Core, resource: string) {

    const classes = resource === this.INTACT ? ['InteractorOccurrences'] : ['InteractorOccurrences', 'Disease']
    const occurrenceNodes: cytoscape.NodeDefinition[] = [];

    interactors.entities
      .filter(interactorEntity => interactorEntity.count > 0)
      .forEach(interactorEntity => {

        const entities = cy?.nodes(`[acc = '${interactorEntity.acc}']`);
        entities?.forEach(entityNode => {

          const pos = {...entityNode.position()};
          pos.x += entityNode.width() / 2;
          pos.y -= entityNode.height() / 2;

          if (!entityNode.data("isFadeOut") && !entityNode.classes().includes('Modification')) {
            occurrenceNodes.push({
              data: {
                id: entityNode.id() + '-occ',
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

}
