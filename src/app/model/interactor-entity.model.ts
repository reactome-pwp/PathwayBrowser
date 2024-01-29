export interface InteractorEntity {
  acc: string;
  count: number;
  interactors: Interactor[] | null;
}

export interface Interactor {
  acc: string;
  accURL: string;
  alias: string;
  evidences: number;
  evidencesURL: string;
  id: number;
  score: number;
}

export interface Interactors {
  entities: InteractorEntity[];
  // PSICQUIC resource (e.g. IntAct, MINT, etc)
  resource: string;
}



