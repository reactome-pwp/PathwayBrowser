import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Event,ReferencedP} from "../model/event.model";
import {map, Observable, Subject} from "rxjs";
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

  //private objectMap: { [id: string]: Event } = {};
  private objectMap: Map<string, Event> = new Map();

  fetchEnhancedEventData(stId: string): Observable<Event> {
    let url = "http://127.0.0.1:8686/data/query/enhanced/" + stId + "?includeRef=true";
    return this.http.get<Event>(url).pipe(
      map((response: Event) => {
        console.log("response before resolving refs ", response)
         const deserializer = new JSOGDeserializer();
         const resolvedResponse = deserializer.deserialize(response);
       // const resolvedResponse = this.deserialize(response);this.deserialize(response);
        console.log('response after resolving refs', resolvedResponse);
        return resolvedResponse as unknown as Event;
       // return this.buildAndResolveEvent(response);
      })
    )
  }




  // private storeObjectById(obj: Event) {
  //   if (obj['@id']) {
  //     this.objectMap[obj['@id']] = obj;
  //   }
  //
  //   for (const key in obj) {
  //     if (typeof obj[key] === 'object' && obj[key] !== null) {
  //       this.storeObjectById(obj[key]);
  //     }
  //   }
  // }

  // private buildEventMapRecursive(event: Event): void {
  //   if (event['@id']) {
  //     this.objectMap.set(event['@id'], event);
  //   }
  //
  //   this.processNestedEvents(event);
  // }
  //
  // private processNestedEvents(event: Event): void {
  //   for (const key in event) {
  //     const value = event[key as keyof Event];
  //
  //     if (Array.isArray(value)) {
  //       value.forEach(item => {
  //         if (item && typeof item === 'object' && '@id' in item) {
  //           this.buildEventMapRecursive(item);
  //         }
  //       });
  //     } else if (value && typeof value === 'object' && '@id' in value) {
  //       this.buildEventMapRecursive(value);
  //     }
  //   }
  // }




  // buildAndResolveEvent(rootEvent: Event): Event {
  //   const dbIdToEvent = new Map<number, Event>();
  //   this.buildEventMapRecursive(rootEvent, dbIdToEvent);
  //  // const eventHelper = new EventHelper();
  //  // eventHelper.buildEventMapRecursive(rootEvent, dbIdToEvent);
  //
  //   console.log('map is ', [...dbIdToEvent]);
  //  // return eventHelper.resolveEventReferences(rootEvent, dbIdToEvent)
  //   return this.resolveEventReferences(rootEvent, dbIdToEvent);
  // }

  // buildEventMapRecursive(event: Event, dbIdToEvent: Map<number, Event>): void {
  //   dbIdToEvent.set(event.dbId, event);
  //
  //   this.processNestedEvents(event, dbIdToEvent);
  // }

  // processNestedEvents(event: Event, eventMap: Map<number, Event>): void {
  //   for (const key in event) {
  //     const value = event[key as keyof Event];
  //
  //     // If the property is an array of events, process each event in the array
  //     if (Array.isArray(value)) {
  //       value.forEach(item => {
  //         if (item && typeof item === 'object' && 'dbId' in item) {
  //           this.buildEventMapRecursive(item, eventMap);
  //         }
  //       });
  //     } else if (value && typeof value === 'object' && 'dbId' in value) {
  //       // If the property is a single event object, process it
  //       this.buildEventMapRecursive(value, eventMap);
  //     }
  //   }
  // }


  // resolveEventReferences(event: Event, eventMap: Map<number, Event>): Event {
  //   const resolvedEvent = this.resolveReferencesRecursively(event, eventMap);
  //   console.log('resolved response is ', resolvedEvent);
  //   return resolvedEvent;
  // }

  // resolveReferencesRecursively(event: Event, eventMap: Map<number, Event>): Event {
  //   const resolvedEvent = {...event};
  //
  //   for (const key in resolvedEvent) {
  //
  //     if (resolvedEvent.hasOwnProperty(key)) {
  //       const value = resolvedEvent[key as keyof Event];
  //       if (Array.isArray(value)) {
  //         resolvedEvent[key as keyof Event] = value.map(item =>
  //           typeof item === 'object' && item !== null
  //             ? this.resolveReferencesRecursively(item, eventMap)
  //             : this.resolveReference(item, eventMap)
  //         );
  //       } else if (typeof value === 'object' && value !== null) {
  //         resolvedEvent[key] = this.resolveReferencesRecursively(value, eventMap);
  //       } else {
  //         resolvedEvent[key] = this.resolveReference(value, eventMap);
  //       }
  //     }
  //   }
  //   return resolvedEvent;
  // }
  //
  // resolveReference<T>(ref: ReferencedP<T>, eventMap: Map<number, T>): T {
  //   if (typeof ref === 'number') {
  //     return eventMap.get(ref) as T;
  //   }
  //   return ref;
  // }


  // buildEventMapRecursive(event: Event, dbIdToEvent: Map<number, Event>): void {
  //   dbIdToEvent.set(event.dbId, event);
  //   event.hasEvent?.forEach(e => {
  //     this.processNestedEvents(e, dbIdToEvent);
  //   });
  //
  //   event.regulatedBy?.forEach(e => {
  //     console.log('item is ', e)
  //     this.processNestedEvents(e, dbIdToEvent);
  //   });
  //
  //   event.regulatedBy?.forEach(regulation => {
  //     regulation.regulatedEntity?.forEach(e => {
  //       this.processNestedEvents(e, dbIdToEvent);
  //     });
  //   });
  //
  //   this.processNestedEvents(event.test, dbIdToEvent);
  // }
  //
  // processNestedEvents(event: ReferencedP<Event>, eventMap: Map<number, Event>): void {
  //   if (typeof event === 'object' && event !== null) {
  //     this.buildEventMapRecursive(event, eventMap);
  //   }
  // }

  // resolveEventReferences(event: Event, eventMap: Map<number, Event>): Event {
  //   const resolvedEvent = {...event};
  //   if (event.hasEvent) {
  //     resolvedEvent.hasEvent = event.hasEvent.map(e => this.resolveReference(e, eventMap));
  //   }
  //
  //   if (event.regulatedBy) {
  //     resolvedEvent.hasEvent = event.regulatedBy.map(e => this.resolveReference(e, eventMap));
  //   }
  //
  //   if (event.regulatedBy) {
  //     resolvedEvent.regulatedBy?.forEach(regulation => {
  //       if (regulation.regulatedEntity) {
  //         regulation.regulatedEntity = regulation.regulatedEntity.map(e => this.resolveReference(e, eventMap));
  //       }
  //     });
  //   }
  //
  //   resolvedEvent.test = this.resolveReference(event.test, eventMap);
  //   console.log('resolved response is ', resolvedEvent);
  //   return resolvedEvent;
  // }
  //
  // resolveReference<T>(ref: ReferencedP<T>, eventMap: Map<number, T>): T {
  //   if (typeof ref === 'number') {
  //     return eventMap.get(ref) as T;
  //   }
  //   return ref;
  // }






  isEvent(item: ReferencedP<Event> | undefined): item is Event {
    return item !== undefined && typeof item === 'object' && 'dbId' in item;
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
