import { Routes } from '@angular/router';
import {ListTerrainsComponent} from "./components/pages/list-terrains/list-terrains.component";
import {TerrainDetailsComponent} from "./components/pages/terrain-details/terrain-details.component";

export const routes: Routes = [
  {path: '', redirectTo: 'terrains', pathMatch: 'full'},
  {'path' : 'terrains', 'component': ListTerrainsComponent, pathMatch: 'full'},
  {'path' : 'terrain/:uuid', 'component': TerrainDetailsComponent, pathMatch: 'full'},
];
