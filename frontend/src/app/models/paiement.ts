import {Reservation} from "./reservation";

export interface Paiement {
  uuid: string;
  montant: number;
  datePaiement?: Date;
  numeroCarte?: string;
  dateExpiration?: string;
  codeVerification?: string;
  titulaireCarte?: string;
  typeCarte?: string;
  reservation?: Reservation;
}
