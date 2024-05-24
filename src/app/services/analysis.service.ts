import {Injectable} from '@angular/core';
import {catchError, distinctUntilChanged, filter, map, Observable, of, share, switchMap, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Analysis} from "../model/analysis.model";
import {DiagramStateService} from "./diagram-state.service";

export type Examples = 'uniprot' | 'microarray';

@Injectable({
  providedIn: 'root'
})
export class AnalysisService {

  result?: Analysis.Result;

  result$ = this.state.state$.pipe(
    map(state => state.analysis.value),
    distinctUntilChanged(),
    switchMap(token =>
      token !== null ?
        (
          token === this.result?.summary.token ?
            of(this.result) : // Same token as cache => use cache
            this.loadAnalysis(token) // Different token than cache => load result
        ) :
        of(undefined) // No tokens => No results
    ),
    share()
  )

  constructor(private http: HttpClient, private state: DiagramStateService) {
  }

  analyse(data: string, params?: Partial<Analysis.Parameters>): Observable<Analysis.Result> {
    return this.http.post<Analysis.Result>(`${environment.host}/AnalysisService/identifiers/projection`, data, {params}).pipe(
      tap(result => this.result = result),
      tap(result => this.state.set('analysis', result.summary.token, true)),
    )
  }

  loadAnalysis(token?: string, params?: Partial<Analysis.Parameters>): Observable<Analysis.Result> {
    console.log('load analysis')
    return this.http.get<Analysis.Result>(`${environment.host}/AnalysisService/token/${token || this.state.get('analysis')}`, {params}).pipe(
      tap(result => this.result = result)
    )
  }

  foundEntities(pathway: string, token?: string, resource: Analysis.Resource = 'TOTAL'): Observable<Analysis.FoundEntities> {
    return this.http.get<Analysis.FoundEntities>(`${environment.host}/AnalysisService/token/${token || this.state.get('analysis')}/found/all/${pathway}`, {
      params: {
        resource
      }
    }).pipe(
      catchError(e => of({
        pathway,
        foundEntities: 0,
        foundInteractors:0,
        expNames: [],
        entities: [],
        interactors:[],
        resources: [resource]
      }))
    )
  }

  pathwaysResults(pathwayIds: number[], token?: string, resource: Analysis.Resource = 'TOTAL'): Observable<Analysis.Pathway[]> {
    if (pathwayIds.length === 0) return of([]);
    return this.http.post<Analysis.Pathway[]>(`${environment.host}/AnalysisService/token/${token || this.state.get('analysis')}/filter/pathways`, pathwayIds.join(','), {
      params:{resource}
    }).pipe(
      catchError(e => of([]))
    )
  }

  example(name: Examples): Observable<Analysis.Result> {
    return this.http.get(`assets/data/analysis-examples/${name}.tsv`, {responseType: 'text'}).pipe(
      switchMap(example => this.analyse(example))
    )
  }


}
