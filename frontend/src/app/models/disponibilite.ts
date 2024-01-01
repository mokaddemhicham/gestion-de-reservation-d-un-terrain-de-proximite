import {Terrain} from "./terrain";

export interface Disponibilite {
  uuid: string;
  jour: string;
  heureDebut: number;
  heureFin: number;
  terrain: Terrain[];
}
