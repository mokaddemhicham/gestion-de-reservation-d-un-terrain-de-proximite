import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {CardTerrainComponent} from "./components/shared/card-terrain/card-terrain.component";
import {ListTerrainsComponent} from "./components/pages/list-terrains/list-terrains.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, CardTerrainComponent, ListTerrainsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Gestion de réservation d\'un terrain de proximité\n';
}
