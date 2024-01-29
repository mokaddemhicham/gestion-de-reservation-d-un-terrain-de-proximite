import {Component, OnInit, ViewChild} from '@angular/core';
import {User} from "../../../models/user";
import {ClientService} from "../../../services/client/client.service";
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {RouterLink} from "@angular/router";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {Terrain} from "../../../models/terrain";
import Swal from "sweetalert2";
import {FooterComponent} from "../../shared/footer/footer.component";
import {MySwiperComponent} from "../../shared/my-swiper/my-swiper.component";

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [CommonModule, RouterLink, MatPaginatorModule, MatTableModule, NgOptimizedImage, FooterComponent, MySwiperComponent],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css'
})
export class ClientsComponent implements OnInit {
  displayedColumns: string[] = ['uuid',  'client', 'email','telephone',
    'adresse', 'cin', 'role', 'actions'];
  clients: User[] = [];
  dataSource = new MatTableDataSource<User>(this.clients);
  constructor(private clientService: ClientService) {}

  ngOnInit() {
    this.loadClients();
  }

  loadClients() {
    this.clientService.getAll().subscribe(
      (clients) => {
        this.clients = clients;
        console.log('Clients loaded successfully', clients);
        this.dataSource = new MatTableDataSource<User>(this.clients);
        this.dataSource.paginator = this.paginator;
        //this.clients = clients;
      },
      (error) => {
        console.error('Error retrieving clients:', error);
        // Gérez l'erreur
      }
    );
  }

  deleteClient(uuid: string | undefined) {
    /*this.clientService.deleteClient(uuid).subscribe(
      (response) => {
        console.log('Client deleted successfully:', response);
        this.loadClients(); // Reload the clients list
      },
      (error) => {
        console.error('Error deleting client:', error);
        // Gérez l'erreur
      }
    );*/
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
        this.clientService.deleteClient(uuid).subscribe({
          next: res =>{
            Swal.fire({
              title: "Supprimé !",
              text: "Le client a été supprimé.",
              icon: "success"
            });
            this.loadClients();
          },
          error: err => {
            Swal.fire({
              title: "Non supprimé !",
              text: "Le Client n'a pas été supprimé.",
              icon: "error"
            });
          }
        })
      }
    });
  }
  @ViewChild(MatPaginator) paginator!: MatPaginator;
}
