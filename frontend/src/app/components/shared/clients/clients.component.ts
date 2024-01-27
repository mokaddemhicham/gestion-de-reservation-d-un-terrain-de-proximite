import {Component, OnInit} from '@angular/core';
import {User} from "../../../models/user";
import {ClientService} from "../../../services/client.service";
import {CommonModule} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css'
})
export class ClientsComponent implements OnInit {
  clients: User[] = [];

  constructor(private clientService: ClientService) {}

  ngOnInit() {
    this.loadClients();
  }

  loadClients() {
    this.clientService.getAll().subscribe(
      (clients) => {
        this.clients = clients;
      },
      (error) => {
        console.error('Error retrieving clients:', error);
        // Gérez l'erreur
      }
    );
  }

  deleteClient(uuid: string | undefined) {
    this.clientService.deleteClient(uuid).subscribe(
      (response) => {
        console.log('Client deleted successfully:', response);
        this.loadClients(); // Reload the clients list
      },
      (error) => {
        console.error('Error deleting client:', error);
        // Gérez l'erreur
      }
    );
  }
}
