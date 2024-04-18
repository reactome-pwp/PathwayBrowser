import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import cytoscape from "cytoscape";
import {map, Observable, switchMap, tap} from "rxjs";
import {Interactors, InteractorToken, PsicquicResource} from "../model/interactor-entity.model";

@Injectable({
  providedIn: 'root',
})

export class InteractorService {

  private postContentCache: string = '';
  private STATIC = 'Static'; //IntAct
  private DISGENET  = 'DisGeNet';
  private staticUrl = 'https://dev.reactome.org/ContentService/interactors/static/molecules/details';
  private disGeNetUrl ='https://dev.reactome.org/overlays/disgenet/findByGenes';
  private psicquicResourcesUrl = 'https://dev.reactome.org/ContentService/interactors/psicquic/resources/'
  private psicquicUrl = 'https://dev.reactome.org/ContentService/interactors/psicquic/molecules/';
  public uploadUrl = "https://dev.reactome.org/ContentService/interactors/upload/tuple/";
  public uplpadPsicquicUrl = "https://dev.reactome.org/ContentService/interactors/upload/psicquic/url";
  private tokenUrl = "https://dev.reactome.org/ContentService/interactors/token/"

  constructor(private http: HttpClient) {
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
    if (resource === this.STATIC) {
      url = this.staticUrl;
    } else if (resource === this.DISGENET) {
      url = this.disGeNetUrl;
    } else {
      url = this.psicquicUrl + resource.toLowerCase() + '/details'
    }

    return this.http.post<Interactors>(url, this.postContentCache, {
      headers: new HttpHeaders({'Content-Type': 'text/plain'})
    });
  }

  lastSelectedResource: string | undefined;
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
    const classes = resource === this.DISGENET ? ['InteractorOccurrences', 'Disease'] : ['InteractorOccurrences'];
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

  public getPsicquicResources(): Observable<PsicquicResource[]>{
   return this.http.get<PsicquicResource[]>(this.psicquicResourcesUrl, {
      headers: new HttpHeaders({'Content-Type': 'application/json;charset=UTF-8'})
    });
  }

  public getInteractorToken(name: string, url: string, body: string | FormData) {
    return this.http.post<InteractorToken>(url, body, {
      params: new HttpParams().set('name', name),
    })
  }

  public getInteractorsFromToken(name: string, url: string, body: string | FormData, cy: cytoscape.Core): Observable<Interactors> {
    this.updatePostContentCacheIfNeeded(cy);
    return this.getInteractorToken(name, url, body).pipe(
      switchMap(token => {
        return this.http.post<Interactors>(this.tokenUrl + token.summary.token, this.postContentCache, {
          headers: new HttpHeaders({'Content-Type': 'text/plain'})
        }).pipe(
          map(interactors => ({...interactors})
          )
        );
      })
    );
  }

}
