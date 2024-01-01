import {Paiement} from "./paiement";
import {Terrain} from "./terrain";
import {User} from "./user";

export interface Reservation {
  uuid: string;
  date: Date;
  heure: number;
  etat: string;
  user: User;
  terrain: Terrain;
  paiement: Paiement;
}
