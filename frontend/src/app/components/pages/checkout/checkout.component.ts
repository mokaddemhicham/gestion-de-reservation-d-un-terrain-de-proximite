import { Component } from '@angular/core';
import {NavBarComponent} from "../../shared/nav-bar/nav-bar.component";
import {InfoTabComponent} from "../../shared/info-tab/info-tab.component";
import {HeaderSectionComponent} from "../../shared/header-section/header-section.component";
import {FooterComponent} from "../../shared/footer/footer.component";

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    NavBarComponent,
    InfoTabComponent,
    HeaderSectionComponent,
    FooterComponent
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {

}
