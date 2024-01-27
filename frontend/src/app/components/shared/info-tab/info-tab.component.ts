import {Component, Input, signal} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {User} from "../../../models/user";
import {SharedService} from "../../../services/shared.service";
import {NgIf} from "@angular/common";
import {MatMenuModule} from "@angular/material/menu";

@Component({
  selector: 'app-info-tab',
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    MatMenuModule
  ],
  templateUrl: './info-tab.component.html',
  styleUrl: './info-tab.component.css'
})
export class InfoTabComponent {
  user: User | null | undefined; // Change the type based on your user model
  currentUser: User | null | undefined;
  @Input("authenticatedUser") authenticatedUser!: User;
  constructor(private router: Router, private userService: SharedService) {}

  /*ngOnInit() {
    const navigation = this.router.getCurrentNavigation?.();
    this.user = navigation?.extras.state?.['user'];
    console.log('User:', this.user);
  }*/





  ngOnInit(): void {
    //this.userService.currentUser$.subscribe(user => this.currentUser = user);
    const userData = sessionStorage.getItem('user');

    // Parse user data if it exists
    if (userData) {
      this.user = JSON.parse(userData);
    }
  }
  public logout(): void {
    // Clear user data from session storage
    sessionStorage.removeItem('user');

    // Redirect to the login page or any other desired page
    this.router.navigate(['/signIN']);
  }
}
