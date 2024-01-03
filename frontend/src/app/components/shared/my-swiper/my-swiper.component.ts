import {AfterViewInit, Component, OnInit} from '@angular/core';
import Swiper from "swiper";

@Component({
  selector: 'app-my-swiper',
  standalone: true,
  imports: [],
  templateUrl: './my-swiper.component.html',
  styleUrl: './my-swiper.component.css'
})
export class MySwiperComponent implements OnInit, AfterViewInit{
  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.initSwiper();
  }

  private initSwiper(): void {
    var mySwiper = new Swiper('.swiper-container', {
      loop: true,
      autoplay: {
          delay: 4000,
      },
      speed: 2000,
      effect: 'fade',
      fadeEffect: {
        crossFade: true
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }

}
