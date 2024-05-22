import {Injectable} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {BehaviorSubject} from "rxjs";
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
};

@Injectable({
  providedIn: 'root'
})
export class DiagramStateService {

  private ignore = false;


  private state: State = {
    select: {otherTokens: ['SEL'], value: []},
    flag: {otherTokens: ['FLG'], value: []},
    flagInteractors: {otherTokens: ['FLGINT'], value: false},
    overlay: {value: ''}
  };

  private _state$ = new BehaviorSubject<State>(this.state);
  public state$ = this._state$.asObservable()

  constructor(route: ActivatedRoute, private router: Router) {
    route.queryParamMap.subscribe(params => {
      if (this.ignore) return;
      let change = false;
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

          change = change || formerValue == param.value;
        }
      }
      if (change) this._state$.next(this.state);
    })
  }

  get<T extends keyof State>(token: T): State[T]['value'] {
    return this.state[token].value
  }

  set<T extends keyof State>(token: T, value: State[T]['value']): void {
    this.state[token].value = value;
    this.ignore = false;
    this.onPropertyModified().then(() =>
      this.ignore = false
    );
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
