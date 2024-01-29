import {Component, OnInit} from '@angular/core';
import {FooterComponent} from "../../shared/footer/footer.component";
import {HeaderSectionComponent} from "../../shared/header-section/header-section.component";
import {InfoTabComponent} from "../../shared/info-tab/info-tab.component";
import {NavBarComponent} from "../../shared/nav-bar/nav-bar.component";
import {Reservation} from "../../../models/reservation";
import {TerrainService} from "../../../services/terrain/terrain.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {SlicePipe} from "@angular/common";
import {PdfGenerationService} from "../../../services/pdf-generation/pdf-generation.service";

@Component({
  selector: 'app-confirmation',
  standalone: true,
  imports: [
    FooterComponent,
    HeaderSectionComponent,
    InfoTabComponent,
    NavBarComponent,
    RouterLink,
    SlicePipe
  ],
  templateUrl: './confirmation.component.html',
  styleUrl: './confirmation.component.css'
})
export class ConfirmationComponent implements OnInit{
  reservation: Reservation = {} as Reservation;
  reservation_uuid!: string;
  user: string = sessionStorage.getItem("user") || ""

  constructor(private terrainService: TerrainService, private route: ActivatedRoute,
              private pdfGenerationService: PdfGenerationService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe({
      next: params =>{
        this.reservation_uuid = params['orderUuid']
        this.getReservation(this.reservation_uuid)
      },
      error: err => {
        console.log(err)
      }
    })
  }

  getReservation(uuid: string){
    this.terrainService.getReservation(uuid).subscribe({
      next: res => {
        this.reservation = res;
        console.log(this.reservation)
      },
      error: err => {
        console.log(err)
      }
    })
  }

  generatePdf(reservation: Reservation): void {
    // Generate PDF using the PdfGenerationService
    this.pdfGenerationService.generatePdf(reservation);
  }


  protected readonly JSON = JSON;
}
