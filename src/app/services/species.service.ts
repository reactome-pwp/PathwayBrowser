import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Analysis} from "../model/analysis.model";
import {Observable, tap} from "rxjs";
import {environment} from "../../environments/environment";
import {Species} from "../model/species.model";

@Injectable({
  providedIn: 'root'
})
export class SpeciesService {

  constructor(private http: HttpClient) { }

  getSpecies(): Observable<Species[]> {
    return this.http.get<Species[]>(`${environment.host}/ContentService/data/species/main`,{
      headers: new HttpHeaders({'Content-Type': 'application/json;charset=UTF-8'})
    });
  }
}
