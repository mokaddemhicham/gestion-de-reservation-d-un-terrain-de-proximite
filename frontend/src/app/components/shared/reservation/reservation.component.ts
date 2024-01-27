import { Component } from '@angular/core';
import {Reservation} from "../../../models/reservation";
import {ReservationService} from "../../../services/reservation.service";
import {DatePipe, NgForOf} from "@angular/common";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {PdfGenerationService} from "../../../services/pdf-generation.service";

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [
    DatePipe,
    RouterLink,
    NgForOf
  ],
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.css'
})
export class ReservationComponent {
  reservations: Reservation[] = [{
    uuid: '0x87de81be80a64d639a9d51cbaca709d9',
    date: new Date('2022-03-15T08:00:00Z'),
    heure: 1,
    etat: 'Confirmed',

  },
    {
      uuid: '0x87de81be80a64d639a9d51cbaca709d9',
      date: new Date('2022-03-20T14:30:00Z'),
      heure: 3,
      etat: 'Pending',


    },];

  constructor(private reservationService: ReservationService, private pdfGenerationService: PdfGenerationService,private route: ActivatedRoute,) {}

  ngOnInit(): void {
    this.loadReservations();
  }

  loadReservations(): void {
    this.reservationService.getReservations().subscribe(
      data => {
        //this.reservations = data;
        console.log("reservations received from backend");
      },
      error => {
        console.error('Error loading reservations', error);
      }
    );
  }

  generatePdf(reservation: Reservation): void {
    // Generate PDF using the PdfGenerationService
    this.pdfGenerationService.generatePdf(reservation);
  }
}
