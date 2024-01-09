import SegmentsEdges = cytoscape.Css.SegmentsEdges;

export interface Diagram {
  displayName: string;
  edges: Edges[];
  nodes: Nodes[];
  compartments: Compartments[];
  links: Links[];
  /**
   * The list of contained shadows(subpathways)
   */
  shadows: Shadows[];
}


export interface ReactionShape {
  a: Position;
  b: Position;
  centre: Position;
  type: string;
}

export interface ConnectorHolder {
  [k: string]: EdgeConnectors[]

  catalysts: EdgeConnectors[];
  inputs: EdgeConnectors[];
  outputs: EdgeConnectors[];
  inhibitors: EdgeConnectors[];
  activators: EdgeConnectors[];
}

// reactions
export type Edges = {
  id: number;
  reactomeId: number;
  displayName: string;
  position: Position;
  renderableClass: string;
  schemaClass: string;
  reactionShape: ReactionShape;
  reactionType: string;
  segments: Segment[];
} & ConnectorHolder;


export interface EdgeConnectors {
  id: number,
  points?: Position[],
  stoichiometry?: number
}


export interface Position {
  x: number;
  y: number;
}

export interface Prop {
  x: number;
  y: number;
  width: number;
  height: number;
}

export type Segment = { from: Position, to: Position };

export interface Connectors {
  edgeId: number;
  type: 'INPUT' | 'OUTPUT' | 'CATALYST' | 'ACTIVATOR' | 'INHIBITOR';
  segments: Segment[]
  stoichiometry: { value: number }
  endShape: {centre: Position}
}


// entities
export interface Nodes {
  id: number;
  displayName: string;
  renderableClass: string;
  schemaClass: string;
  position: Position;
  prop: Prop,
  connectors: Connectors[]
  interactorsSummary: InteractorsSummary;
}

export interface Compartments {
  id: number;
  componentIds: number[];
  displayName: string;
  position: Position;
  prop: Prop,
  renderableClass: string;
  insets: Prop;
  textPosition: Position;
}

export interface Links {
  id: number
  inputs: EdgeConnectors[];
  outputs: EdgeConnectors[];
  renderableClass: string;
  segments: Segment[];
}

interface Shadows {
  id: number
  displayName: string;
  position: Position;
  renderableClass: string;
  schemaClass: string;
  prop: Prop,
  reactomeId: number;
  colour: string;
}


interface InteractorsSummary {
 shape: Shape;
 type: string;
}

interface Shape{
  type: string
}
