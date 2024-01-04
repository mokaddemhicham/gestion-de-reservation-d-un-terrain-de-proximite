import {Component, Input} from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-header-section',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './header-section.component.html',
  styleUrl: './header-section.component.css'
})
export class HeaderSectionComponent {
  @Input() pageTitle: string = 'Default title';
  @Input() pageDescription: string = 'Default description';
}
