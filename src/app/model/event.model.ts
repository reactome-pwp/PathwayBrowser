export interface Event {
  dbId?: number; //todo remove this ? when deleting tree-nested-overview
  stId: string;
  displayName: string;
  schemaClass: string
  hasEvent?: Event[];
  isSelected?: boolean
}
