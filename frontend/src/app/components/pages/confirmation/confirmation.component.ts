import { Component } from '@angular/core';
import {FooterComponent} from "../../shared/footer/footer.component";
import {HeaderSectionComponent} from "../../shared/header-section/header-section.component";
import {InfoTabComponent} from "../../shared/info-tab/info-tab.component";
import {NavBarComponent} from "../../shared/nav-bar/nav-bar.component";

@Component({
  selector: 'app-confirmation',
  standalone: true,
    imports: [
        FooterComponent,
        HeaderSectionComponent,
        InfoTabComponent,
        NavBarComponent
    ],
  templateUrl: './confirmation.component.html',
  styleUrl: './confirmation.component.css'
})
export class ConfirmationComponent {

}
