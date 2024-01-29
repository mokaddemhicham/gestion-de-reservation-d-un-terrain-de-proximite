import {Paiement} from "./paiement";

export interface ReservationDto {
  uuid: string;
  date: Date;
  heure: number;
  etat: string;
  user: string;
  terrain: string;
  paiement?: Paiement;
}
