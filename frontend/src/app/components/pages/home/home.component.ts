import { Component } from '@angular/core';
import {NavBarComponent} from "../../shared/nav-bar/nav-bar.component";
import {InfoTabComponent} from "../../shared/info-tab/info-tab.component";
import {FooterComponent} from "../../shared/footer/footer.component";
import {MySwiperComponent} from "../../shared/my-swiper/my-swiper.component";
import {ImageHoverComponent} from "../../shared/image-hover/image-hover.component";
import {TeamComponent} from "../../shared/team/team.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NavBarComponent,
    InfoTabComponent,
    FooterComponent,
    MySwiperComponent,
    ImageHoverComponent,
    TeamComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  user: string = sessionStorage.getItem("user") || ""
  protected readonly JSON = JSON;
}
