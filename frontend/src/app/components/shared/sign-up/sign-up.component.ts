import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {User} from "../../../models/user";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {ClientService} from "../../../services/client.service";
import {NgClass} from "@angular/common";
import {ProprietaireTerrain} from "../../../models/proprietaire-terrain";

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    FormsModule,
    NgClass
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  userType: string = 'regular';

  user: User = {
    role: "",
    nom: '',
    prenom: '',
    email: '',
    password: '',
    telephone: '',
    adresse: '',
    cin: ''
  };
 /* user: User | ProprietaireTerrain = {
    nom: 'mohamed',
    prenom: '',
    email: '',
    password: '',
    telephone: '',
    adresse: '',
    cin: '',
  };*/
  constructor(private clientService: ClientService) {}

  /*onSubmit() {


    this.clientService.saveClient(this.user).subscribe(
      (response) => {
        console.log('Client saved successfully:', response);
        // Handle successful response
      },
      (error) => {
        console.error('Error saving client:', error);
        // Handle error
      }
    );
  }*/

  onSubmit() {
    // Handle the form submission based on the selected role
    if (this.userType === 'regular') {
      // Process as a regular client
      console.log('Regular Client Signup:', this.user);

      // Call your API service to save the regular client data
      this.clientService.saveClient(this.user).subscribe(
        (response) => {
          console.log('Regular Client saved successfully:', response);
          // Handle successful response
        },
        (error) => {
          console.error('Error saving regular client:', error);
          // Handle error
        }
      );

    } else if (this.userType === 'owner') {
      // Process as an owner
      console.log('Owner Signup:', this.user.cin);

      // Call your API service to save the owner data
      this.clientService.saveOwner(this.user as ProprietaireTerrain).subscribe(
        (response) => {
          console.log('Owner saved successfully:', response);
          // Handle successful response
        },
        (error) => {
          console.error('Error saving owner:', error);
          // Handle error
        }
      );
    }
  }
}
