import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {CardTerrainComponent} from "./components/shared/card-terrain/card-terrain.component";
import {ListTerrainsComponent} from "./components/pages/list-terrains/list-terrains.component";
import {TerrainSearchComponent} from "./components/shared/terrain-search/terrain-search.component";
import {NavigationComponent} from "./components/shared/navigation/navigation.component";
import {TryNavComponent} from "./components/try-nav/try-nav.component";
import {HichamNavComponent} from "./components/shared/hicham-nav/hicham-nav.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, CardTerrainComponent, ListTerrainsComponent, TerrainSearchComponent, NavigationComponent, TryNavComponent, HichamNavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Gestion de réservation d\'un terrain de proximité\n';
}
