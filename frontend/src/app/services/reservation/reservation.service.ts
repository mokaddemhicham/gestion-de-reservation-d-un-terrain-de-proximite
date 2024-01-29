import { Injectable } from '@angular/core';
import {Reservation} from "../../models/reservation";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private apiUrl = 'http://localhost:8080/api/v1/reservations';

  constructor(private http: HttpClient) {}

  getReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(this.apiUrl);
  }

  deleteReservation(uuid: string) {
    return this.http.delete(`${this.apiUrl}/delete/${uuid}`);
  }
  getReservationCount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/reservationCount`);
  }
  getMonthlyReservation(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/monthlyReservations`);
  }

  getReservationProprietaire(uuid: string): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.apiUrl}/proprietaire/${uuid}`);
  }

}
