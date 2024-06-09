import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {Species} from "../model/species.model";

@Injectable({
  providedIn: 'root'
})
export class SpeciesService {

  private currentSpeciesSubject = new BehaviorSubject<Species | undefined>(undefined);
  public currentSpecies$ = this.currentSpeciesSubject.asObservable();

  constructor(private http: HttpClient) { }

  getSpecies(): Observable<Species[]> {
    return this.http.get<Species[]>(`${environment.host}/ContentService/data/species/main`,{
      headers: new HttpHeaders({'Content-Type': 'application/json;charset=UTF-8'})
    });
  }

  setShortName(s: Species) {
    const parts = s.displayName.split(' ');
    // If there are not exactly two parts, return the original string
    if (parts.length !== 2) {
      throw new Error('Invalid species name format. Expected "Genus species".');
    }
    const genus = parts[0];
    const species = parts[1];
    s.shortName = `${genus.charAt(0)}.${species}`;
  }
  setCurrentSpecies(species: Species) {
    this.currentSpeciesSubject.next(species);
  }
}
