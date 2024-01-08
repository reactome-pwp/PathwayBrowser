
export interface Graph {
  dbId:number;
  stId: string;
  speciesName: string;
  edges: Edges[];
  nodes: Nodes[];
  subpathways: SubPathways[];
}

interface Edges {
  dbId: number;
  stId: string;
  displayName: string;
  schemaClass:string;
}

interface Nodes {
  dbId: number;
  stId: string;
  displayName: string;
  schemaClass:string;
  diagramIds:string[];
  parents:number[];
  children:number[];
}

interface SubPathways {
  dbId: number;
  stId: string;
  displayName: string;
  events: number[]
}
