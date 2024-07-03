import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Event} from "../model/event.model";
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private readonly _TOP_LEVEL_PATHWAYS = `${environment.host}/ContentService/data/pathways/top/`;
  private readonly _ENHANCED_QUERY = `${environment.host}/ContentService/data/query/enhanced/`
  private readonly _ANCESTORS = `${environment.host}/ContentService/data/event/`


  private _selectedEvent: Subject<Event> = new Subject<Event>();
  public selectedEvent$ = this._selectedEvent.asObservable();

  private _breadcrumbsSubject = new Subject<Event[]>();
  breadcrumbs$ = this._breadcrumbsSubject.asObservable();

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

  fetchChildEvents(stId: string): Observable<Event> {
    let url = this._ENHANCED_QUERY + stId;
    return this.http.get<Event>(url)
  }

  fetchEventAncestors(stId: string): Observable<Event[][]> {
    let url = this._ANCESTORS + stId + '/ancestors';
    return this.http.get<Event[][]>(url)

  }

  getEventsHierarchy(taxId: string): Observable<Event[]> {
    let url = `${environment.host}/ContentService/data/eventsHierarchy/` + taxId + `?pathwaysOnly=false&resource=TOTAL&interactors=false`;
    return this.http.get<Event[]>(url)
  }

}
