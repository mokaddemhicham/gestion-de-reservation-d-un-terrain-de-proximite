import {Component, OnInit} from '@angular/core';
import {NavBarComponent} from "../../shared/nav-bar/nav-bar.component";
import {InfoTabComponent} from "../../shared/info-tab/info-tab.component";
import {HeaderSectionComponent} from "../../shared/header-section/header-section.component";
import {FooterComponent} from "../../shared/footer/footer.component";
import {TerrainService} from "../../../services/terrain/terrain.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {Reservation} from "../../../models/reservation";
import {NgOptimizedImage, SlicePipe} from "@angular/common";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Paiement} from "../../../models/paiement";
import {ReservationDto} from "../../../models/reservationDto";

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    NavBarComponent,
    InfoTabComponent,
    HeaderSectionComponent,
    FooterComponent,
    RouterLink,
    SlicePipe,
    NgOptimizedImage,
    ReactiveFormsModule
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit{
  reservation: Reservation = {} as Reservation;
  reservation_uuid!: string;
  paiementForm!: FormGroup;
  user: string = sessionStorage.getItem("user") || ""
  constructor(private terrainService: TerrainService, private route: ActivatedRoute,
              private router: Router, private fb: FormBuilder) {
    this.paiementForm = this.fb.group({
      numeroCarte: new FormControl('', Validators.required),
      dateExpiration: new FormControl('', Validators.required),
      codeVerification: new FormControl('', Validators.required),
      titulaireCarte: new FormControl('', Validators.required),
      typeCarte: new FormControl('', Validators.required),
      terms: new FormControl('', Validators.required)
    })
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


  onSubmit() {
    let paiement: Paiement = {} as Paiement;
    paiement.numeroCarte = this.paiementForm.get('numeroCarte')?.value;
    paiement.dateExpiration = this.paiementForm.get('dateExpiration')?.value;
    paiement.codeVerification = this.paiementForm.get('codeVerification')?.value;
    paiement.titulaireCarte = this.paiementForm.get('titulaireCarte')?.value;
    paiement.typeCarte = this.paiementForm.get('typeCarte')?.value;
    paiement.montant = this.reservation.terrain?.prix || 0;
    paiement.datePaiement = new Date();
    this.terrainService.updateReservation(this.reservation.uuid, paiement).subscribe({
      next: res => {
        this.router.navigate(['reservation/confirmation', res.uuid])
      },
      error: err => {
        console.log(err)
      }
    })

  }

  protected readonly JSON = JSON;
}
