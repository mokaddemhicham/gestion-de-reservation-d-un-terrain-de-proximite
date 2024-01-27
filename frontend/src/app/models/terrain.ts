import {Service} from "./service";
import {Disponibilite} from "./disponibilite";
import {ProprietaireTerrain} from "./proprietaire-terrain";
import {Reservation} from "./reservation";

export interface Terrain {
  uuid: string;
  nom: string;
  description: string;
  image: string;
  prix: number;
  taille: string;
  addresse: string;
  localisation: string;
  type: string;
  proprietaire: ProprietaireTerrain;
  services: Service[];
  disponibilites: Disponibilite[];
  reservations: Reservation[];
}
