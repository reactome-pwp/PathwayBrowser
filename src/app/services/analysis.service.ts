import {Injectable} from '@angular/core';
import {catchError, Observable, of, switchMap, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Analysis} from "../model/analysis.model";
import {DiagramStateService} from "./diagram-state.service";
import {brewer, Scale, scale} from "chroma-js";


export type Palette = keyof typeof brewer;

export type PaletteGroup = 'sequential' | 'diverging' | 'continuous';

// type PaletteSummary = { name: Palette, scale: Scale, gradient: string };

export class PaletteSummary {
  private readonly _scale: Scale;
  scale: Scale;
  gradient: string;

  constructor(private name: Palette) {
    this._scale = scale(name).mode('oklab')
    this.scale = this._scale
    this.gradient = `linear-gradient(to right in oklab, ${brewer[this.name].join(', ')})`
  }

  classes(n: number) {
    if (n > 0) {
      this.scale = this._scale.classes(n)
      this.gradient = `linear-gradient(to right in oklab, ${this.scale.colors(n).map((c, i) => `${c} ${i / n * 100}%, ${c} ${(i + 1) / n * 100}%`).join(', ')})`
    } else {
      this.scale = this._scale
      this.gradient = `linear-gradient(to right in oklab, ${brewer[this.name].join(', ')})`
    }
  }

  domain(min: number, max: number) {
    this.scale = this.scale.domain([min, max])
  }
}


export type Examples = 'uniprot' | 'microarray';

@Injectable({
  providedIn: 'root'
})
export class AnalysisService {

  paletteOptions: Map<Palette, PaletteSummary> = new Map(Object.keys(brewer)
    .filter(name => name.toLowerCase() !== name)
    .map(name => ([name as Palette, new PaletteSummary(name as Palette)])));

  palette: PaletteSummary = this.paletteOptions.get('RdBu')!;
  palettes: { name: PaletteGroup, palettes: Palette[], valid: boolean }[] = [
    {
      name: 'sequential', valid: false, palettes: [
        'Greys', 'Purples', 'Blues', 'Greens', 'Oranges', 'Reds',
        'BuPu', 'RdPu', 'PuRd',
        'GnBu', 'YlGnBu', 'PuBu', 'PuBuGn',
        'BuGn', 'YlGn',
        'YlOrBr', 'OrRd', 'YlOrRd'
      ]
    },
    {name: 'diverging', valid: true, palettes: ['RdYlGn', 'RdYlBu', 'RdGy', 'RdBu', 'PuOr', 'PRGn', 'PiYG', 'BrBG']},
    {name: 'continuous', valid: false, palettes: ['Spectral', 'Viridis']},
  ]

  result?: Analysis.Result;

  result$ = this.state.onChange.analysis$.pipe(
    switchMap(token =>
      token !== null ?
        (
          token === this.result?.summary.token ?
            of(this.result) : // Same token as cache => use cache
            this.loadAnalysis(token) // Different token than cache => load result
        ) :
        of(undefined) // No tokens => No results
    )
  )

  constructor(private http: HttpClient, private state: DiagramStateService) {
  }

  clearAnalysis() {
    this.result = undefined;
    this.state.set('analysis', null);
  }

  analyse(data: string, params?: Partial<Analysis.Parameters>): Observable<Analysis.Result> {
    return this.http.post<Analysis.Result>(`${environment.host}/AnalysisService/identifiers/projection`, data, {params}).pipe(
      tap(result => this.result = result),
      tap(result => this.state.set('analysis', result.summary.token)),
    )
  }

  loadAnalysis(token?: string, params?: Partial<Analysis.Parameters>): Observable<Analysis.Result> {
    console.log('load analysis')
    if (token) this.state.set('analysis', token);
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
      catchError(() => of({
        pathway,
        foundEntities: 0,
        foundInteractors: 0,
        expNames: [],
        entities: [],
        interactors: [],
        resources: [resource]
      }))
    )
  }

  pathwaysResults(pathwayIds: number[], token?: string, resource: Analysis.Resource = 'TOTAL'): Observable<Analysis.Pathway[]> {
    if (pathwayIds.length === 0) return of([]);
    return this.http.post<Analysis.Pathway[]>(`${environment.host}/AnalysisService/token/${token || this.state.get('analysis')}/filter/pathways`, pathwayIds.join(','), {
      params: {resource}
    }).pipe(
      catchError(() => of([]))
    )
  }

  example(name: Examples): Observable<Analysis.Result> {
    return this.http.get(`assets/data/analysis-examples/${name}.tsv`, {responseType: 'text'}).pipe(
      switchMap(example => this.analyse(example))
    )
  }


}
