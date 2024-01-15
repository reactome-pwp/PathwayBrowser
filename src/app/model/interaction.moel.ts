interface Entity {
  acc: string;
  count: number;
}

interface Interactors {
  acc: string;
  accURL: string;
  alias: string;
  evidences: number;
  evidencesURL: string;
  id: number;
  score: number;

}

export interface Interaction {
  entities: Entity[];
  resource: string;
  interactors: Interactors[] | null;
}



