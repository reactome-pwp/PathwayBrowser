// export interface Event extends DatabaseObject {
//   dbId: number;
//   stId: string;
//   displayName: string;
//   schemaClass: string
//   hasEvent?: ReferencedP<Event>[];
//   hasDiagram: boolean;
//   isSelected?: boolean;
//   isHovered?: boolean;
//   isInferred?: boolean;
//   releaseStatus: string;
//   isInDisease: boolean;
//   parents: Event[];
//   test: ReferencedP<Event>;
// }


// interface ObjectKeys {
//   [key: string]: any;
// }


export interface JSOGObject {
  [key: string]: any;
  '@id'?: string;
  '@ref'?: string;
}


export interface DatabaseObject{
  dbId: number
}

export interface Event extends DatabaseObject {
  dbId: number;
  stId: string;
  displayName: string;
  schemaClass: string
  hasEvent?: Event[];
  hasDiagram: boolean;
  isSelected?: boolean;
  isHovered?: boolean;
  isInferred?: boolean;
  releaseStatus: string;
  isInDisease: boolean;
  parents: Event[];
  test: Event;
  regulatedBy?: Regulation[];
}

export interface Regulation extends Event {
  regulatedEntity?: Event[]
}

/**
 *  w1 with hasEvent?: ReferencedP<Event>[]
 */

//Define a type that resolves ReferencedP<T> into T
// export type ReferencedP<T> = T | number;
//
// // Helper type to transform a single item
// type TransformItem<T> =
//   T extends ReferencedP<infer U> ? (U extends { dbId: number } ? TransformObject<U> : U) :
//     T extends Array<infer U> ? TransformArray<U> :
//       T;
//
// // Helper type to transform arrays
// type TransformArray<T> = TransformItem<T>[];
//
// // Helper type to transform objects
// type TransformObject<T> = {
//   [K in keyof T]: TransformItem<T[K]>;
// };
//
// // Applying the transformation to the Event type
// export type ReferencedEvent = TransformObject<Event>;


/**
 *  w2 with hasEvent?: ReferencedP<Event>[]
 */
//
// // Utility type to add ReferencedP<T> wrapper to properties with dbId
// export type ReferencedP<T> = T | number;
//
// // Helper type to handle array and object types
// type ResolveArray<T> = T extends (infer U)[]
//   ? ResolveReferencedP<U>[]
//   : T;
//
// // Main recursive type to resolve ReferencedP<Event> to Event
// type ResolveReferencedP<T> = T extends ReferencedP<infer U>
//   ? U extends Event
//     ? ResolveObject<U>
//     : U
//   : ResolveArray<T> extends infer R
//     ? R extends object
//       ? ResolveObject<R>
//       : R
//     : T;
//
// // Helper type to handle objects
// export type ResolveObject<T> = T extends object
//   ? { [K in keyof T]: ResolveReferencedP<T[K]> }
//   : T;
//
// // Derived type with ReferencedP<Event> replaced with Event
// export type ReferencedEvent = ResolveReferencedP<Event>;


/**
 *  w3 with hasEvent?: Event[]
 *   By default, properties in the Event type will not be transformed.
 *   They will retain their original types unless explicitly handled.
 *
 *   If you want a property to support being either an ID or a full object (a reference),
 *   you need to ensure it is handled in ResolveReferencedP.
 *
 *   In the ResolveReferencedP type definition, Omit is used to remove certain properties from a type when handling DatabaseObject types.
 *   This is done to prevent infinite recursion and to ensure that specific properties can be handled differently.
 *   For instance hasEvent property that itself can reference other Event objects. By omitting these properties, you avoid potential infinite recursion issues when resolving nested structures.
 */

export type ReferencedP<T> = T | number;


//Recursively resolves ReferencedP types to their underlying types
export type ResolveReferencedP<T> = T extends ReferencedP<infer U>
  ? U extends DatabaseObject
    ? (Omit<U, 'hasEvent' | 'test' |'number'> & { //add it to here if it could be a reference
    hasEvent?: ResolveReferencedP<U>[];
    test: ResolveReferencedP<U>;
   // number: number;
  }) | number
    : U
  : T extends Array<infer U>
    ? ResolveReferencedP<U>[]
    : T extends object
      ? { [K in keyof T]: ResolveReferencedP<T[K]> }
      : T;

// Use this type to create a resolved version of Event
export type ReferencedEvent = ResolveReferencedP<Event>;


let x: ReferencedEvent = {
  dbId: 1,
  displayName: "",
  hasEvent: [
    3, {
      dbId: 2,
      displayName: "",
      hasEvent: [],
      isHovered: false,
      isInDisease: false,
      isInferred: false,
      hasDiagram: false,
      isSelected: false,
      parents: [],
      releaseStatus: "",
      schemaClass: "",
      stId: "",
      test: 3
    }],
  isHovered: false,
  isInDisease: false,
  isInferred: false,
  hasDiagram: false,
  isSelected: false,
  parents: [],
  releaseStatus: "",
  schemaClass: "",
  stId: "",
  test: 2
}

// function convertToReferencedEvent(data: any): ReferencedEvent {
//   // Recursive function to convert nested structures
//   function convert(obj: any): any {
//     if (typeof obj === 'object' && obj !== null) {
//       // Convert arrays
//       if (Array.isArray(obj)) {
//         return obj.map(item => convert(item));
//       }
//
//       // Convert objects
//       const convertedObj: any = {};
//       for (let key in obj) {
//         if (Object.prototype.hasOwnProperty.call(obj, key)) {
//           convertedObj[key] = convert(obj[key]);
//         }
//       }
//       return convertedObj;
//     } else {
//       // Direct value (number, string, etc.)
//       return obj;
//     }
//   }
//
//   // Convert the data object recursively
//   return convert(data);
// }

//let convertedX = convertToReferencedEvent(x);

// // Utility type to add ReferencedP<T> wrapper to properties with dbId
// export type ReferencedP<T> = T | number;
//
// // Utility type to add ReferencedP<T> wrapper to properties with dbId
// export type AddReference<T> = {
//   [K in keyof T]: T[K] extends DatabaseObject
//     ? ReferencedP<AddReference<T[K]>> | undefined
//     : T[K] extends Array<infer U>
//       ? U extends DatabaseObject
//         ? ReferencedP<AddReference<U>>[] | undefined
//         : T[K]
//       : T[K];
// };

// // Applying the utility type to Event
// export type ReferencedEvent = AddReference<Event>;
