import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthenticationService} from "../../../services/authentication/authentication.service";
import {SharedService} from "../../../services/shared.service";
import {HeaderSectionComponent} from "../header-section/header-section.component";
import {FooterComponent} from "../footer/footer.component";
import {InfoTabComponent} from "../info-tab/info-tab.component";
import {NavBarComponent} from "../nav-bar/nav-bar.component";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {ToastrService} from "ngx-toastr";
import {User} from "../../../models/user";

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [
    FormsModule,
    HeaderSectionComponent,
    FooterComponent,
    InfoTabComponent,
    NavBarComponent,
    ReactiveFormsModule
  ],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {



  credentials = { email: '', password: '' };
  private isAuthenticated: boolean =false;

  constructor(private toastr: ToastrService,private authService: AuthenticationService, private sharedService: SharedService, private router: Router) {}

  onSubmit() {
    // Call your authentication service to handle the sign-in logic
    this.authService.signIn(this.credentials).subscribe(
      (user) => {
        console.log('Sign-in successful:', user);
        this.sharedService.setUser(user);
        this.isAuthenticated = true;
        // Redirect to a different page after successful sign-in
        //this.router.navigate(['/terrains'], { state: { user: response } });
        this.authService.handleSuccessfulSignIn(user);
        if (user.role="proprietaireTerrain"){
          this.router.navigate(['/admin/terrains']);
        }else{
          this.router.navigate(['/terrains']);
        }

      },
      (error) => {
        console.error('Error signing in:', error);
        // Handle error, e.g., show an error message to the user
      }
    );
  }
  showSuccess() {
    this.toastr.success('Le terrain a été ajouté avec succès !');
  }

  showError(message: string) {
    this.toastr.error(message);
  }

  showWarning() {
    this.toastr.warning('This is a warning message.', 'Warning');
  }

  showInfo() {
    this.toastr.info('This is an info message.', 'Info');
  }
}

