import {AfterViewInit, Component, OnInit} from '@angular/core';
import Swiper from "swiper";
import {NgForOf} from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-my-swiper',
  standalone: true,
  imports: [
    NgForOf
  ],
  template: `
    <p>Swipe to change slides</p>
    <swiper-container>
      <swiper-slide>Slide 1</swiper-slide>
      <swiper-slide>Slide 2</swiper-slide>
      <swiper-slide>Slide 3</swiper-slide>
      <swiper-slide>Slide 4</swiper-slide>
    </swiper-container>
  `,
  styleUrl: './my-swiper.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MySwiperComponent implements OnInit, AfterViewInit{
  images: string[] = [
    'https://swiperjs.com/demos/images/nature-1.jpg',
    'https://swiperjs.com/demos/images/nature-2.jpg',
    'https://swiperjs.com/demos/images/nature-3.jpg'
    // Add more image paths as needed
  ];

  constructor() { }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.initSwiper();
  }

  private initSwiper(): void {
    var mySwiper = new Swiper ('.swiper-container', {


      speed: 2000,
      effect: 'fade',
      fadeEffect: {
        crossFade: true
      },

      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    })



  }

}
