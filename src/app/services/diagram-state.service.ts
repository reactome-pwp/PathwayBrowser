import {Injectable} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {BehaviorSubject, distinctUntilChanged, map, Observable, tap} from "rxjs";
import {isArray, isBoolean} from "lodash";


export interface UrlParam<T> {
  value: T
  otherTokens?: string[]
}

export type State = {
  [token: string]: UrlParam<any>
  select: UrlParam<(string | number)[]>
  flag: UrlParam<(string | number)[]>
  flagInteractors: UrlParam<boolean>
  overlay: UrlParam<string | null>
  analysis: UrlParam<string | null>
  analysisProfile: UrlParam<string | null>
};

type ObservableState = { [K in keyof State as `${K & string}$`]: Observable<State[K]['value']> };

@Injectable({
  providedIn: 'root'
})
export class DiagramStateService {

  private propagate = false;


  private state: State = {
    select: {otherTokens: ['SEL'], value: []},
    flag: {otherTokens: ['FLG'], value: []},
    flagInteractors: {otherTokens: ['FLGINT'], value: false},
    overlay: {value: ''},
    analysis: {value: null, otherTokens: ['ANALYSIS']},
    analysisProfile: {value: null},
  };

  private _state$ = new BehaviorSubject<State>(this.state);
  public state$ = this._state$.asObservable();
  public onChange: ObservableState = Object.keys(this.state)
    .reduce((properties, prop: keyof State) => {
      properties[`${prop}$`] = this.state$.pipe(
        map(state => state[prop].value),
        distinctUntilChanged((v1, v2) => v1?.toString() === v2?.toString()),
        tap(v => console.log(`${prop} has been updated to ${v}`)),
        // share()
      )
      return properties;
    }, {} as ObservableState);

  constructor(route: ActivatedRoute, private router: Router) {
    route.queryParamMap.subscribe(params => {
      for (const mainToken in this.state) {
        const param = this.state[mainToken];
        const tokens: string[] = [mainToken, ...param.otherTokens || []];
        const token = tokens.find(token => params.has(token));
        if (token) {
          const formerValue = param.value;
          if (isArray(param.value)) {
            const rawValue = params.get(token)!;
            param.value = rawValue.split(',').map(v => v.charAt(0).match(/d/) ? parseInt(v) : v);
          } else if (isBoolean(param.value)) {
            param.value = params.get(token) === 'true';
          } else {
            param.value = params.get(token)!;
          }
        }
      }
      if (this.propagate) this._state$.next(this.state);
    })
  }

  get<T extends keyof State>(token: T): State[T]['value'] {
    return this.state[token].value
  }

  set<T extends keyof State>(token: T, value: State[T]["value"], propagate = true): void {
    this.state[token].value = value;
    this.propagate = propagate;
    this.onPropertyModified();
  }

  onPropertyModified() {
    return this.router.navigate([], {
      queryParams: {
        ...Object.entries(this.state)
          .filter(([token, param]) => param.value && param.value.length !== 0)
          .reduce((acc, [token, param]) => ({
            ...acc,
            [token]: Array.isArray(param.value) ? param.value.join(',') : param.value
          }), {})
      }
    })
  }


}
