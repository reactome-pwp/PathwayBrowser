import {Species} from "./species.model";

export interface TopLevelPathway {
  className: string;
  dbId: number;
  displayName: string;
  hasDiagram: boolean;
  hasEHLD: boolean;
  isInDisease: boolean;
  isInferred: boolean;
  lastUpdatedDate: string;
  name: string[];
  releaseDate: string;
  releaseStatus: string | null;
  schemaClass: string;
  species: Species[];
  speciesName: string;
  stId: string;
  stIdVersion: string;
}

export interface EnhancedEntry{
   //authored: Authored;
   className: string;
}
