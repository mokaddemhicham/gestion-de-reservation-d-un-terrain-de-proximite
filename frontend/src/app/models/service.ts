import {Terrain} from "./terrain";

export interface Service {
  uuid: string | null;
  libelle: string;
  icon: string;
  terrains: Terrain[];
}
