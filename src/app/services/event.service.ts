import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Event, OrthologousMap} from "../model/event.model";
import {BehaviorSubject, map, Observable, of, Subject, switchMap, tap} from "rxjs";
import {JSOGDeserializer} from "../utils/JSOGDeserializer";
import {Species} from "../model/species.model";
import {DiagramStateService} from "./diagram-state.service";
import {isNumber, isString} from "lodash";


@Injectable({
  providedIn: 'root'
})
export class EventService {

  private readonly _TOP_LEVEL_PATHWAYS = `${environment.host}/ContentService/data/pathways/top/`;
  private readonly _ENHANCED_QUERY = `${environment.host}/ContentService/data/query/enhanced/`
  private readonly _DATA_QUERY = `${environment.host}/ContentService/data/query/`
  private readonly _ANCESTORS = `${environment.host}/ContentService/data/event/`


  private _selectedEvent: Subject<Event> = new Subject<Event>();
  public selectedEvent$ = this._selectedEvent.asObservable();

  private _selectedObj: Subject<Event> = new Subject<Event>();
  public selectedObj$ = this._selectedObj.asObservable();

  private _breadcrumbsSubject = new Subject<Event[]>();
  breadcrumbs$ = this._breadcrumbsSubject.asObservable();


  private _subpathwaysColors = new BehaviorSubject<Map<number, string>>(new Map<number, string>());
  subpathwaysColors$ = this._subpathwaysColors.asObservable();



  constructor(private http: HttpClient) {
  }

  setCurrentEvent(event: Event) {
    this._selectedEvent.next(event);
  }

  setCurrentObj(event: Event) {
    this._selectedObj.next(event);
  }

  setBreadcrumbs(events: Event[]) {
    this._breadcrumbsSubject.next(events);
  }

  setSubpathwaysColors(colorMap: Map<number, string>) {
    this._subpathwaysColors.next(colorMap);
  }


  fetchTlpBySpecies(taxId: string): Observable<Event[]> {
    let url = `${this._TOP_LEVEL_PATHWAYS}${taxId}`;
    return this.http.get<Event[]>(url);
  }


  fetchEventAncestors(stId: string | number): Observable<Event[][]> {
    let url = `${this._ANCESTORS}${stId}/ancestors`;
    return this.http.get<Event[][]>(url)
  }


  fetchEnhancedEventData(stId: string): Observable<Event> {
    let url = `${this._ENHANCED_QUERY}${stId}?includeRef=true`;
    return this.http.get<Event>(url).pipe(
      map((response: Event) => {
        const deserializer = new JSOGDeserializer();
        const resolvedResponse = deserializer.deserialize(response);
        return resolvedResponse as unknown as Event;
      })
    )
  }

  fetchEventData(stId: string): Observable<Event> {
    let url = `${this._DATA_QUERY}${stId}`;
    return this.http.get<Event>(url).pipe(
      map((response: Event) => {
        const deserializer = new JSOGDeserializer();
        const resolvedResponse = deserializer.deserialize(response);
        return resolvedResponse as unknown as Event;
      })
    )
  }


  getSelectedTreeEvent(selectedIdFromUrl: string, diagramId: string): Observable<Event> {
    const id = selectedIdFromUrl || diagramId;

    if (selectedIdFromUrl) {
      return this.fetchEnhancedEventData(selectedIdFromUrl).pipe(
        switchMap(event => this.processFetchedEvent(event, diagramId))
      );
    }

    return this.fetchEnhancedEventData(id).pipe(
      tap(event => {
        this.setCurrentEvent(event);
        this.setCurrentObj(event);
      })
    );
  }

  private processFetchedEvent(event: Event, diagramId: string): Observable<Event> {
    // When it's an entity
    if (this.isEntity(event)) {
      this.setCurrentObj(event);
      return this.fetchEnhancedEventData(diagramId).pipe(
        tap(diagramEvent => this.setCurrentEvent(diagramEvent))
      );
    }

    this.setCurrentEvent(event);
    this.setCurrentObj(event);
    return of(event);
  }


  hasChild = (_: number, event: Event) => !!event.hasEvent && event.hasEvent.length > 0 || ['TopLevelPathway', 'Pathway', 'CellLineagePath'].includes(event.schemaClass);

  //todo : rename it
  eventHasChild(event: Event): boolean {
    return this.hasChild(0, event);
  }


  isEntity(event: Event) {
    return (!this.eventHasChild(event) && !this.isReaction(event));
  }

  isReaction(event: Event) {
    return (['Reaction', 'BlackBoxEvent', 'CellDevelopmentStep'].includes(event.schemaClass));
  }

  getOrthologousMap(identifiers: number[], speciesDbId: number): Observable<OrthologousMap> {
    const url = `${this._ORTHOLOGIES}${speciesDbId}`;
    return this.http.post<OrthologousMap>(url, identifiers, {headers: new HttpHeaders({'Content-Type': 'text/plain'})});
  }


  private hasValidAncestors(ancestors:Event[]): boolean {
    return !!(ancestors && ancestors.length);
  }

  getOrthologyEventStId(taxId: string, id: string, selectedIdFromUrl: string, diagramId: string, ancestors:Event[], allSpecies: Species[]): Observable<string> {
    if (!this.hasValidAncestors(ancestors)) {
      return of(id);
    }

    const ancestorIds = ancestors.map(a => a.dbId);
    const speciesDbId = allSpecies.find(s => s.taxId === taxId)?.dbId;

    if (!speciesDbId || !ancestorIds.length) {
      return of(id);
    }

    return this.getOrthologousMap(ancestorIds, speciesDbId).pipe(
      tap(response => {
        this.orthologousMap = response;
        if (this.orthologousMap[id]) {
          console.log("Found orthologous map");
          console.log(this.orthologousMap[selectedIdFromUrl]);
          id = selectedIdFromUrl;
          this.state.set('select', selectedIdFromUrl);
        } else {
          console.log("Not found in orthologous map");
          console.log('this.diagramId', diagramId);
          id = diagramId;
          this.state.set('select', '');
        }
      }),
      map(() => id)
    );
  }



  // todo: add comments here to explain why
  // fetchData(stId: string): Observable<Event> {
  //   const data = this.http.get<Event>(this._DATA_QUERY + stId);
  //   const enhancedData = this.http.get<Event>(this._ENHANCED_QUERY + stId);
  //   return forkJoin({
  //     data: data,
  //     enhancedData: enhancedData
  //   }).pipe(
  //       map((results) => {
  //         const result = results.data;
  //         const enhancedResult = results.enhancedData;
  //         const mergedEvent = {...result};
  //         for (const key in enhancedResult) {
  //           if (enhancedData.hasOwnProperty(key) && !data.hasOwnProperty(key)) {
  //             mergedEvent[key] = enhancedResult[key];
  //           }
  //         }
  //         return mergedEvent;
  //       })
  //     )
  // }


  getEventsHierarchy(taxId: string): Observable<Event[]> {
    let url = `${environment.host}/ContentService/data/eventsHierarchy/` + taxId + `?pathwaysOnly=false&resource=TOTAL&interactors=false`;
    return this.http.get<Event[]>(url)
  }


}
