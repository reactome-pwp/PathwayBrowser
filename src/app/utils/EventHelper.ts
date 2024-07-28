import {Event, ReferencedP} from "../model/event.model";

export class EventHelper {
  // buildEventMapRecursive(event: Event, dbIdToEvent: Map<number, Event>): void {
  //   dbIdToEvent.set(event.dbId, event);
  //
  //   this.processNestedEvents(event, dbIdToEvent);
  // }
  //
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
  //
  //
  // resolveEventReferences(event: Event, eventMap: Map<number, Event>): Event {
  //   const resolvedEvent = this.resolveReferencesRecursively(event, eventMap);
  //   console.log('resolved response is ', resolvedEvent);
  //   return resolvedEvent;
  // }
  //
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
  //       }
  //       // else if (typeof value === 'object' && value !== null) {
  //       //   resolvedEvent[key] = this.resolveReferencesRecursively(value, eventMap);
  //       // } else {
  //       //   resolvedEvent[key] = this.resolveReference(value, eventMap);
  //       // }
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

}
