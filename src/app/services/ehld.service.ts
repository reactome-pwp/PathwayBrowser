import { Injectable } from '@angular/core';
import {BehaviorSubject, catchError, map, Observable, of, Subject} from "rxjs";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Event} from "../model/event.model";

@Injectable({
  providedIn: 'root'
})
export class EhldService {

  private readonly _HasEHLD = `${environment.host}/ContentService/data/query/`;



  private _hasEHLD = new BehaviorSubject<boolean>(false);
  hasEHLD$ = this._hasEHLD.asObservable();

  constructor(private http: HttpClient) { }

  setHasEHLD(value: boolean): void {
    this._hasEHLD.next(value);
  }

   hasEHLD(diagramId: string): Observable<boolean> {
    let url = `${this._HasEHLD}${diagramId}/hasEHLD`;
    return this.http.get<boolean>(url).pipe(
      catchError(() => of(false))
    );
  }

  getEHLDSvg(id: string): Observable<string> {
    return this.http.get(`${environment.host}/download/current/ehld/${id}.svg`, { responseType: 'text' });
  }

}
