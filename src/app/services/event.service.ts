import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Event} from "../model/event.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private TOP_LEVEL_PATHWAYS = `${environment.host}/ContentService/data/pathways/top/`;
  private ENHANCED_QUERY = `${environment.host}/ContentService/data/query/enhanced/`
  private ANCESTORS = `${environment.host}/ContentService/data/event/`


  constructor(private http: HttpClient) {
  }


  fetchTlpBySpecies(taxId: string): Observable<Event[]> {
    let url = this.TOP_LEVEL_PATHWAYS + taxId;
    return this.http.get<Event[]>(url);
  }

  fetchChildEvents(stId: string): Observable<Event> {
    let url = this.ENHANCED_QUERY + stId;
    return this.http.get<Event>(url)
  }

  fetchEventAncestors(stId: string): Observable<Event[][]> {
    let url = this.ANCESTORS + stId + '/ancestors';
    return this.http.get<Event[][]>(url)

  }

  getEventsHierarchy(taxId: string): Observable<Event[]> {
    let url = `${environment.host}/ContentService/data/eventsHierarchy/` + taxId + `?pathwaysOnly=false&resource=TOTAL&interactors=false`;
    return this.http.get<Event[]>(url)
  }

}
