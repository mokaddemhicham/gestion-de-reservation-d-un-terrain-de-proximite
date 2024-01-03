import {Component, HostListener,OnInit,Renderer2} from '@angular/core';
import {ScrollService} from "../../../services/scroll.service";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent {
  isNavbarFixed = false;
  constructor(private renderer: Renderer2) { }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const offset = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    const navbar = document.querySelector('.sticky-top');
    console.log(offset);
    if (offset > 40) {
      this.renderer.addClass(document.body, 'fixed-navbar');
      this.renderer.removeClass(navbar, 'custom-navbar');
      this.isNavbarFixed = true;
    } else {
      this.renderer.removeClass(document.body, 'fixed-navbar');
      this.renderer.addClass(navbar, 'custom-navbar');
      this.isNavbarFixed = false;
    }
  }

  ngOnInit() {
    // Additional initialization logic if needed
  }

  bookNow() {
    // Handle Book Now button click logic
  }
}
