export interface Interactor {
  acc: string;
  accURL: string;
  alias: string;
  evidences: number;
  evidencesURL: string;
  id: number;
  score: number;
}

export interface Position {
  x: number;
  y: number;
}

export interface Segment {
  from: Position;
  to: Position;
}
