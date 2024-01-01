import {Service} from "./service";
import {Disponibilite} from "./disponibilite";
import {ProprietaireTerrain} from "./proprietaire-terrain";
import {Reservation} from "./reservation";

export interface Terrain {
  uuid: string;
  name: string;
  description: string;
  image: string;
  price: number;
  taille: string;
  adresse: string;
  localisation: string;
  type: string;
  proprietaire: ProprietaireTerrain;
  services: Service[];
  disponibilites: Disponibilite[];
  reservations: Reservation[];
}
