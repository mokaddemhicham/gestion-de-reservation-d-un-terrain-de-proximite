import {Component, ViewChild} from '@angular/core';
import {Reservation} from "../../../models/reservation";
import {ReservationService} from "../../../services/reservation/reservation.service";
import {DatePipe, NgForOf, NgOptimizedImage, SlicePipe} from "@angular/common";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {PdfGenerationService} from "../../../services/pdf-generation/pdf-generation.service";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {Terrain} from "../../../models/terrain";
import {TerrainService} from "../../../services/terrain/terrain.service";
import Swal from "sweetalert2";
import {User} from "../../../models/user";

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [
    DatePipe,
    RouterLink,
    NgForOf,
    MatPaginatorModule,
    MatTableModule,
    NgOptimizedImage,
    SlicePipe
  ],
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.css'
})
export class ReservationComponent {
  /*reservations: Reservation[] = [{
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
*/


  generatePdf(reservation: Reservation): void {
    // Generate PDF using the PdfGenerationService
    this.pdfGenerationService.generatePdf(reservation);
  }
  displayedColumns: string[] =  ['uuid', 'heure', 'date', 'actions'];

  reservations: Reservation[] = []
  proprietaireReservations: Reservation[] = [];

  dataSource = new MatTableDataSource<Reservation>(this.reservations);

  constructor(private reservationService: ReservationService, private pdfGenerationService: PdfGenerationService,private route: ActivatedRoute,) {
  }

  delete(uuid: string){
    Swal.fire({
      title: "Êtes-vous sûr ?",
      text: "Vous ne pourrez pas revenir en arrière !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui, supprimez-le !",
      cancelButtonText: "Annuler"
    }).then((result) => {
      if (result.isConfirmed) {
        this.reservationService.deleteReservation(uuid).subscribe({
          next: res =>{
            Swal.fire({
              title: "Supprimé !",
              text: "Le terrain a été supprimé.",
              icon: "success"
            });
            this.fetchData()
          },
          error: err => {
            Swal.fire({
              title: "Non supprimé !",
              text: "Le terrain n'a pas été supprimé.",
              icon: "error"
            });
          }
        })
      }
    });
  }

  ngOnInit(): void {
    const data = sessionStorage.getItem('user');
    var role: string ='';
    if (data){
      var proprietaire: User = JSON.parse(data);
      role = proprietaire.role;
    }

    if (role === 'proprietaireTerrain') {
      this.fetchProprietaireReservation();
    }else if(role === 'admin'){
      this.fetchData();
    }


  }

  fetchData(){
    this.reservationService.getReservations().subscribe({
      next: (res: Reservation[])=>{
        console.log(res)
        this.reservations= res;
        this.dataSource = new MatTableDataSource<Reservation>(this.reservations);
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
  fetchProprietaireReservation(){
    //get proprietaire reservations
    const proprietaire = sessionStorage.getItem('user');
    var id='';
    if (proprietaire){
      var proprietaireTmp: User = JSON.parse(proprietaire);
      id = proprietaireTmp.uuid;
    }
    const proprietaireId = id;
    this.reservationService.getReservationProprietaire(proprietaireId).subscribe(
      data => {
        this.proprietaireReservations = data;
        this.dataSource = new MatTableDataSource<Reservation>(this.proprietaireReservations);
      },
      error => {
        console.error('Error fetching reservations:', error);
      }
    );
  }
  @ViewChild(MatPaginator) paginator!: MatPaginator;

}
