import { Component } from '@angular/core';
import {MySwiperComponent} from "../my-swiper/my-swiper.component";

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    MySwiperComponent
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

}
