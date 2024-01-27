import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {CardTerrainComponent} from "./components/shared/card-terrain/card-terrain.component";
import {ListTerrainsComponent} from "./components/pages/list-terrains/list-terrains.component";
import {TerrainSearchComponent} from "./components/shared/terrain-search/terrain-search.component";
import {NavBarComponent} from "./components/shared/nav-bar/nav-bar.component";
import { HttpClientModule } from '@angular/common/http';
import {SignUpComponent} from "./components/shared/sign-up/sign-up.component";
import {InfoTabComponent} from "./components/shared/info-tab/info-tab.component";

@Component({
  selector: 'app-root',
  standalone: true,
    imports: [CommonModule, RouterLink, SignUpComponent, RouterLinkActive, RouterOutlet, CardTerrainComponent, HttpClientModule, ListTerrainsComponent, TerrainSearchComponent, NavBarComponent, InfoTabComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Gestion de réservation d\'un terrain de proximité\n';
}
