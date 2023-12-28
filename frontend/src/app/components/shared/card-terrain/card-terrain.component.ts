import {Component, Input} from '@angular/core';
import {NgForOf, NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-card-terrain',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgForOf
  ],
  templateUrl: './card-terrain.component.html',
  styleUrl: './card-terrain.component.css'
})
export class CardTerrainComponent {

  @Input() terrain: any;

}
