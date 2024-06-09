import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {TopLevelPathway} from "../model/event.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private TOP_LEVEL_PATHWAYS = `${environment.host}/ContentService/data/pathways/top/`;


  constructor(private http: HttpClient) { }


  fetchTopBySpecies(taxId: string): Observable<TopLevelPathway[]>{
    let url = this.TOP_LEVEL_PATHWAYS + taxId;
    return this.http.get<TopLevelPathway[]>(url);
  }
}
