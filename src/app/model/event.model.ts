// export interface DatabaseObject {
//
//   dbId: number;
//   displayName: string;
//   schemaClass: string;
//   stId: string;
//
//   // created: InstanceEdit;
//   // modified:InstanceEdit;
//
// }

// export interface Event extends DatabaseObject {
//   definition: string;
//   //A simple flag to indicate if this Event object is a disease
//   isInDisease: Boolean;
//   //A simple flag to indicate if this Event is inferred from another
//   isInferred: boolean;
//   name: string[];
//   releaseDate: string;
//   releaseStatus: string;
//   speciesName: string;
//   eventOf: Pathway[];
//   precedingEvent: Event[];
//   followingEvent: Event;
//   inferredFrom: Event[];
//   orthologousEvent: Event[];
//   relatedSpecies: Species[];
//   species: Species[];
//   hasEvent: Event[]

// reviewed: InstanceEdit;
// revised: InstanceEdit;
// summation: Summation[];
// negativePrecedingEvent: NegativePrecedingEvent[];
// reviewStatus: ReviewStatus;
// internalReviewed: InstanceEdit[];
// structureModified: InstanceEdit[];
// literatureReference: Publication[];
// goBiologicalProcess: GO_BiologicalProcess;
// evidenceType: EvidenceType;
// figure: Figure[];
// authored: InstanceEdit;
// crossReference: DatabaseIdentifier[];
// compartment: HasCompartment[];
// disease: Disease[];
// edited: InstanceEdit;
// }

// export interface Pathway extends Event {
//
//   doi: string;
//   hasDiagram: boolean;
//   hasEHLD: boolean
//   isCanonical: String;
//   hasEvent: Event[];
//   lastUpdatedDate: string;
//   // hasEncapsulatedEvent: HasEncapsulatedEvent[];
//   //normalPathway: NormalPathway;
// }

// export interface TopLevelPathway extends Pathway {
// }



  // treeControl?: TreeControl<TopLevelPathway> | undefined;
  // dataSource?: DataSource<TopLevelPathway> | undefined;

  // treeControl?: NestedTreeControl<TopLevelPathway>;
  // dataSource?: MatTreeNestedDataSource<TopLevelPathway>;
  // isExpanded?: boolean;

  // schemaClass: string;
  // stId: string;
  // stIdVersion:string
  // hasDiagram: boolean;
  // hasEHLD: boolean
  // lastUpdatedDate: string;
  // //A simple flag to indicate if this Event object is a disease
  // isInDisease: Boolean;
  // //A simple flag to indicate if this Event is inferred from another
  // isInferred: boolean;
  // name: string[];
  // releaseDate: string;
  // releaseStatus: string;
  // speciesName: string;

// }


// export interface EnhancedEntry {
//
//   className: string;
//   dbId: number;
//   displayName: string;
//   stId: string;
//   hasEvent: EnhancedEntry[];


// hasDiagram: boolean;
// hasEHLD: boolean;
// isInDisease: boolean;
// isInferred: boolean;
// lastUpdatedDate: string;
// name: string[];
// orthologousEvent: Event[];
// hasEvent: Event[];
// releaseDate: string;
// schemaClass: string;
// species: Species;
// speciesName: string;
// stIdVersion: string;
// summation: Summation;
// literatureReference: LiteratureReference;
// modified: InstanceEdit;
// reviewStatus: ReviewStatus;
// reviewed: InstanceEdit;
// edited: InstanceEdit;
// goBiologicalProcess: GoBiologicalProcess;
// created: InstanceEdit;
// authored: InstanceEdit;

// }


export interface EventObject {
  dbId: number;
  stId: string;
  displayName: string;
  schemaClass: string
  hasEvent?: EventObject[];
}
