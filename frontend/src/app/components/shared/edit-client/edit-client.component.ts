import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {User} from "../../../models/user";
import {ActivatedRoute, Router} from "@angular/router";
import {ClientService} from "../../../services/client/client.service";
import {CommonModule} from "@angular/common";
import {InfoTabComponent} from "../info-tab/info-tab.component";
import {NavBarComponent} from "../nav-bar/nav-bar.component";
import {FooterComponent} from "../footer/footer.component";

@Component({
  selector: 'app-edit-client',
  standalone: true,
  imports: [
    FormsModule, CommonModule, InfoTabComponent, NavBarComponent, FooterComponent
  ],
  templateUrl: './edit-client.component.html',
  styleUrl: './edit-client.component.css'
})
export class EditClientComponent {
  clientId : string ="" ;
  clientToUpdate: User = {} as User
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
        sessionStorage.setItem("user", JSON.stringify(response))
        this.loadClientForUpdate()
      },
      (error) => {
        console.error('Error updating client:', error);
        // Handle the error
      }
    );
  }
}
