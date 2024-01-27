import {Reservation} from "./reservation";

export interface Paiement {
  uuid: string;
  montant: number;
  date?: Date;
  type?: string;
  numeroCarte?: string;
  dateExpiration?: string;
  codeVerification?: string;
  titulaireCarte?: string;
  typeCarte?: string;
  reservation?: Reservation;
}
