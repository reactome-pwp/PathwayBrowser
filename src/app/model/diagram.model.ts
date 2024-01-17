export interface Position {
  x: number;
  y: number;
}

export interface Prop extends Position {
  width: number;
  height: number;
}

export type Segment = { from: Position, to: Position };

export interface Diagram {
  displayName: string;
  edges: Edge[];
  nodes: Node[];
  compartments: Compartment[];
  links: Link[];
  /**
   * The list of contained shadows(subpathways)
   */
  shadows: SubPathway[];
}


export interface ReactionShape {
  a: Position;
  b: Position;
  centre: Position;
  type: string;
}

export interface ConnectorHolder {
  [k: string]: EdgeConnector[]

  catalysts: EdgeConnector[];
  inputs: EdgeConnector[];
  outputs: EdgeConnector[];
  inhibitors: EdgeConnector[];
  activators: EdgeConnector[];
}

export type Entity = {
  id: number;
  reactomeId: number;
  displayName: string;
  position: Position;
  renderableClass: string;
  schemaClass: string;
  isDisease: boolean;
}

// reactions
export type Edge = {
  reactionShape: ReactionShape;
  reactionType: string;
  segments: Segment[];
} & ConnectorHolder & Entity;


export interface EdgeConnector {
  id: number,
  points?: Position[],
  stoichiometry?: number
}

export interface NodeConnector {
  edgeId: number;
  type: 'INPUT' | 'OUTPUT' | 'CATALYST' | 'ACTIVATOR' | 'INHIBITOR';
  segments: Segment[]
  stoichiometry: { value: number }
  endShape: { centre: Position }
}

// entities
export interface Node extends Entity {
  prop: Prop,
  connectors: NodeConnector[]
  interactorsSummary: InteractorsSummary;
  nodeAttachments?: Attachment[];
}

export interface Compartment extends Entity {
  componentIds: number[];
  prop: Prop,
  insets: Prop;
  textPosition: Position;
}

export interface Link {
  id: number;
  inputs: EdgeConnector[];
  outputs: EdgeConnector[];
  renderableClass: string;
  segments: Segment[];
}

interface SubPathway extends Entity {
  prop: Prop;
  colour: string;
}


interface InteractorsSummary {
  shape: Shape;
  type: string;
}

interface Shape {
  type: string;
  a: Position;
  b: Position;
  centre: Position;
  empty: boolean;
  s: string;
}

interface Attachment {
  description: string;
  label: string;
  reactomeId: number;
  shape: Shape
}
