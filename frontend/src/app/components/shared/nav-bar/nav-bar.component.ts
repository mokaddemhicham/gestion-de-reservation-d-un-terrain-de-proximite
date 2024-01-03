import {Component, ElementRef, HostListener, Renderer2} from '@angular/core';
import {NgClass} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    NgClass,
    RouterLink
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  isFixed: boolean = false;
  showScrollButton: boolean = false;
  isMenuActive: boolean = false;

  constructor(private el: ElementRef) {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.toggleClass('.header', 'fixed', window.scrollY > 40);
    this.toggleClass('.header', 'custom', window.scrollY < 40);
    this.toggleClass('.scrollToTop', 'activeScrollButton', window.scrollY > 400);
  }

  toggleMenu() {
    this.toggleActiveClass('.nav-bar ul', 'activeList');
    this.toggleActiveClass('#s1', 'animateToggleMenu1');
    this.toggleActiveClass('#s2', 'animateToggleMenu2');
    this.toggleActiveClass('#s3', 'animateToggleMenu3');
  }

  private toggleActiveClass(selector: string, className: string, condition: boolean = true): void {
    const element = this.el.nativeElement.querySelector(selector);
    if (element) {

      if (element.classList.contains(className)) {
        element.classList.remove(className);
        condition= false;
      } else {
        element.classList.add(className);
        condition = true;
      }
    }
  }
  private toggleClass(selector: string, className: string, condition: boolean = true): void {
    const element = this.el.nativeElement.querySelector(selector);
    if (element) {

      if (condition) {
        console.log(condition);
        element.classList.add(className);
        condition= false;
      } else {
        element.classList.remove(className);
        condition = true;
      }
    }
  }
}
