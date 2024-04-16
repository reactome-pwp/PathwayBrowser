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

export interface PsicquicResource{
  name: string;
  soapURL: string;
  restURL: string;
  active: boolean
}


