import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Event} from "../model/event.model";
import {BehaviorSubject, map, Observable, Subject} from "rxjs";
import {JSOGDeserializer} from "../utils/JSOGDeserializer";

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

  private _breadcrumbsSubject = new Subject<Event[]>();
  breadcrumbs$ = this._breadcrumbsSubject.asObservable();


  private _subpathwaysColors = new BehaviorSubject<Map<number, string>>(new Map<number, string>());
  subpathwaysColors$ = this._subpathwaysColors.asObservable();



  constructor(private http: HttpClient) {
  }

  setCurrentEvent(event: Event) {
    this._selectedEvent.next(event);
  }

  setBreadcrumbs(events: Event[]) {
    this._breadcrumbsSubject.next(events);
  }

  fetchTlpBySpecies(taxId: string): Observable<Event[]> {
    let url = this._TOP_LEVEL_PATHWAYS + taxId;
    return this.http.get<Event[]>(url);
  }


  fetchEventAncestors(stId: string | number): Observable<Event[][]> {
    let url = this._ANCESTORS + stId + '/ancestors';
    return this.http.get<Event[][]>(url)
  }


  fetchEnhancedEventData(stId: string): Observable<Event> {
    let url = this._ENHANCED_QUERY + stId + "?includeRef=true";
    return this.http.get<Event>(url).pipe(
      map((response: Event) => {
        const deserializer = new JSOGDeserializer();
        const resolvedResponse = deserializer.deserialize(response);
        return resolvedResponse as unknown as Event;
      })
    )
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
