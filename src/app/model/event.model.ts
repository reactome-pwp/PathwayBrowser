export interface Event {
  dbId: number;
  stId: string;
  displayName: string;
  schemaClass: string
  hasEvent?: Event[];
  isSelected?: boolean;
  isHovered?:boolean;
  isInferred?: boolean;
  releaseStatus: string;
  isInDisease: boolean;
  parents: string[];

}
