import { Routes } from '@angular/router';
import {ListTerrainsComponent} from "./components/pages/list-terrains/list-terrains.component";
import {TerrainDetailsComponent} from "./components/pages/terrain-details/terrain-details.component";
import {CheckoutComponent} from "./components/pages/checkout/checkout.component";
import {ConfirmationComponent} from "./components/pages/confirmation/confirmation.component";

export const routes: Routes = [
  {path: '', redirectTo: 'terrains', pathMatch: 'full'},
  {'path' : 'terrains', 'component': ListTerrainsComponent, pathMatch: 'full'},
  {'path' : 'terrain/:uuid', 'component': TerrainDetailsComponent, pathMatch: 'full'},
  {path : 'reservation/checkout/:orderUuid', component: CheckoutComponent, pathMatch: 'full'},
  {path: 'reservation/confirmation/:orderUuid', component: ConfirmationComponent, pathMatch: 'full'}
];
