import {User} from "./user";
import {Terrain} from "./terrain";

export interface ProprietaireTerrain extends User{
  cin: string;
  adresse: string;
  role: string;
  terrains: Terrain[];
}
