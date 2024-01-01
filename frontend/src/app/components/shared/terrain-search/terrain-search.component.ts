import {Component, signal} from '@angular/core';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-terrain-search',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './terrain-search.component.html',
  styleUrl: './terrain-search.component.css'
})
export class TerrainSearchComponent {
  searchDestinations = signal<any | null>(null);
  destination: any;
  type: any;
  date: any;
  guests: any;

}
