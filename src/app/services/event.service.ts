import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {EventObject} from "../model/event.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private TOP_LEVEL_PATHWAYS = `${environment.host}/ContentService/data/pathways/top/`;
  private ENHANCED_QUERY = `${environment.host}/ContentService/data/query/enhanced/`


  constructor(private http: HttpClient) {
  }


  fetchTlpBySpecies(taxId: string): Observable<EventObject[]> {
    let url = this.TOP_LEVEL_PATHWAYS + taxId;
    return this.http.get<EventObject[]>(url);
  }

  fetchChildEvents(stId: string): Observable<EventObject> {
    let url = this.ENHANCED_QUERY + stId;
    return this.http.get<EventObject>(url)
  }

  getEventsHierarchy(taxId: string): Observable<EventObject[]> {
    let url = `${environment.host}/ContentService/data/eventsHierarchy/`
    return this.http.get<EventObject[]>(url + taxId + `?pathwaysOnly=false&resource=TOTAL&interactors=false`)
  }
}
