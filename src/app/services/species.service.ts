import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {Species} from "../model/species.model";

@Injectable({
  providedIn: 'root'
})
export class SpeciesService {

  private readonly _MAIN_SPECIES =`${environment.host}/ContentService/data/species/main`

  defaultSpecies = {displayName: 'Homo sapiens', taxId: '9606', shortName: 'H.sapiens'};
  private _currentSpeciesSubject = new BehaviorSubject<Species>(this.defaultSpecies);
  public currentSpecies$ = this._currentSpeciesSubject.asObservable();


  /**
   * This map is to help get current species value from the diagramId string when loading data. For instance:
   *  diagramId = R-HSA-4090294 then current species is H.sapiens, and then it will be selected in the species list
   */
  readonly abbreviationToSpecies: Map<string, Species> = new Map<string, Species>([
    ['HSA', {displayName: 'Homo sapiens', taxId: '9606', shortName: 'H.sapiens'}],
    ['BTA', {displayName: 'Bos taurus', taxId: '9913', shortName: 'B.taurus'}],
    ['CEL', {displayName: 'Caenorhabditis elegans', taxId: '6239', shortName: 'C.elegans'}],
    ['CFA', {displayName: 'Canis familiaris', taxId: '9615', shortName: 'C.familiaris'}],
    ['DRE', {displayName: 'Danio rerio', taxId: '7955', shortName: 'D.rerio'}],
    ['DDI', {displayName: 'Dictyostelium discoideum', taxId: '44689', shortName: 'D.discoideum'}],
    ['DME', {displayName: 'Drosophila melanogaster', taxId: '7227', shortName: 'D.melanogaster'}],
    ['GGA', {displayName: 'Gallus gallus', taxId: '9031', shortName: 'G.gallus'}],
    ['MMU', {displayName: 'Mus musculus', taxId: '10090', shortName: 'M.musculus'}],
    ['MTU', {displayName: 'Mycobacterium tuberculosis', taxId: '1773', shortName: 'M.tuberculosis'}],
    ['PFA', {displayName: 'Plasmodium falciparum', taxId: '5833', shortName: 'P.falciparum'}],
    ['RNO', {displayName: 'Rattus norvegicus', taxId: '10116', shortName: 'R.Rorvegicus'}],
    ['SCE', {displayName: 'Saccharomyces cerevisiae', taxId: '4932', shortName: 'S.cerevisiae'}],
    ['SPO', {displayName: 'Schizosaccharomyces pombe', taxId: '4896', shortName: 'S.pombe'}],
    ['SSC', {displayName: 'Sus scrofa', taxId: '99823', shortName: 'S.scrofa'}],
    ['XTR', {displayName: 'Xenopus tropicalis', taxId: '8364', shortName: 'X.tropicalis'}]
  ]);


  constructor(private http: HttpClient) {
  }

  getSpecies(): Observable<Species[]> {
    return this.http.get<Species[]>(this._MAIN_SPECIES, {
      headers: new HttpHeaders({'Content-Type': 'application/json;charset=UTF-8'})
    });
  }

  setShortName(s: Species) {
    const parts = s.displayName.split(' ');
    // If there are not exactly two parts, return the original string
    if (parts.length !== 2) {
      throw new Error('Invalid species name format. Expected "Genus species".');
    }
    const genus = parts[0];
    const species = parts[1];
    s.shortName = `${genus.charAt(0)}.${species}`;
  }
  setCurrentSpecies(species: Species) {
    this._currentSpeciesSubject.next(species);
  }

  public setSpeciesFromDiagramId(diagramId: string) {
    // Find the value between the hyphens
    const speciesTerm = diagramId.match(/-(.*?)-/);
    let species;
    if (speciesTerm) {
      // speciesTerm[0] = -HSA-, speciesTerm[0] = HSA
      species = this.abbreviationToSpecies.get(`${speciesTerm[1]}`)
      if (species) {
        this.setCurrentSpecies(species);
      }
    }
  }

}
