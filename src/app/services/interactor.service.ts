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
}
