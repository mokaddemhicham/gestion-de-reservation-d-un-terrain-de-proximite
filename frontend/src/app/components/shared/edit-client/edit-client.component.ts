import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {User} from "../../../models/user";
import {ActivatedRoute, Router} from "@angular/router";
import {ClientService} from "../../../services/client.service";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-edit-client',
  standalone: true,
  imports: [
    FormsModule,CommonModule
  ],
  templateUrl: './edit-client.component.html',
  styleUrl: './edit-client.component.css'
})
export class EditClientComponent {
  clientId : string ="" ;
  clientToUpdate: User = {adresse: "", email: "", nom: "", password: "", prenom: "", telephone: "",cin: "",role: "client"};
  constructor(private route: ActivatedRoute, private router: Router, private clientService: ClientService) {}
  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.clientId = params['id'];
      this.loadClientForUpdate();
    });
  }

  loadClientForUpdate() {
    this.clientService.getClientById(this.clientId!).subscribe(
      (client) => {
        console.log('Client to update:', client);
        this.clientToUpdate = client;
      },
      (error) => {
        console.error('Error retrieving client for update:', error);
        // Handle the error
      }
    );
  }

  updateClient() {
    console.log(this.clientToUpdate);
    this.clientService.updateClient(this.clientId, this.clientToUpdate).subscribe(
      (response) => {
        console.log('Client updated successfully:', response);
        this.router.navigate(['/clients']); // Navigate back to the clients list after update
      },
      (error) => {
        console.error('Error updating client:', error);
        // Handle the error
      }
    );
  }
}
