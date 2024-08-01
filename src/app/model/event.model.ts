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
