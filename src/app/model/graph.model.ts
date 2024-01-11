
export interface Graph {
  dbId: number;
  stId: string;
  speciesName: string;
  edges: Edge[];
  nodes: Node[];
  subpathways: SubPathway[];
}

export type Entity = {
  dbId: number;
  stId: string
  displayName: string;
}

export interface Edge extends Entity {
  schemaClass: string;
}

export interface Node extends Entity {
  diagramIds: string[];
  identifier: string
  parents: number[];
  children: number[];
  schemaClass: string;
  referenceType: string
}

export interface SubPathway extends Entity {
  events: number[]
}
