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
  type: string
}


export interface Interactors {
  entities: InteractorEntity[];
  resource: string; //STATIC, DisGeNet PSICQUIC resource (e.g. IntAct, MINT, etc) or Custom resource
}

export interface PsicquicResource{
  name: string;
  soapURL: string;
  restURL: string;
  active: boolean
}


export interface InteractorToken{
  summary: Summary;
  warningMessage: string;
}

interface Summary {
  token:string;
  interactors: number;
  interactions: number;
  fileName: string;
  name: string
}

export class InputCategory {
  url: string | undefined
  content: string | FormData | undefined
}

export class Resource {
  token: InteractorToken | undefined;
}

