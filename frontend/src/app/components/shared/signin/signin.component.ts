import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {AuthenticationService} from "../../../services/authentication/authentication.service";
import {SharedService} from "../../../services/shared.service";
import {HeaderSectionComponent} from "../header-section/header-section.component";
import {FooterComponent} from "../footer/footer.component";
import {InfoTabComponent} from "../info-tab/info-tab.component";
import {NavBarComponent} from "../nav-bar/nav-bar.component";

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [
    FormsModule,
    HeaderSectionComponent,
    FooterComponent,
    InfoTabComponent,
    NavBarComponent
  ],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {

  credentials = { email: '', password: '' };
  private isAuthenticated: boolean =false;

  constructor(private authService: AuthenticationService, private sharedService: SharedService, private router: Router) {}

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
        this.router.navigate(['/terrains']);
      },
      (error) => {
        console.error('Error signing in:', error);
        // Handle error, e.g., show an error message to the user
      }
    );
  }

}

