import {Component, ElementRef, HostListener, Renderer2} from '@angular/core';
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-hicham-nav',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './hicham-nav.component.html',
  styleUrl: './hicham-nav.component.css'
})
export class HichamNavComponent {
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
    // console.log(element);element.classList.contains(className)
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
    // console.log(element);element.classList.contains(className)
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
