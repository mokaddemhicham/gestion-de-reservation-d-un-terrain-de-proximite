import { Routes } from '@angular/router';
import {ListTerrainsComponent} from "./components/pages/list-terrains/list-terrains.component";
import {TerrainDetailsComponent} from "./components/pages/terrain-details/terrain-details.component";
import {CheckoutComponent} from "./components/pages/checkout/checkout.component";
import {ConfirmationComponent} from "./components/pages/confirmation/confirmation.component";
import {SignUpComponent} from "./components/shared/sign-up/sign-up.component";
import {ClientsComponent} from "./components/shared/clients/clients.component";
import {EditClientComponent} from "./components/shared/edit-client/edit-client.component";
import {SigninComponent} from "./components/shared/signin/signin.component";
import {AdminAuthGuard} from "./auth.guard";
import {ReservationComponent} from "./components/shared/reservation/reservation.component";


export const routes: Routes = [
  {path: '', redirectTo: 'terrains', pathMatch: 'full'},
  {path : 'terrains', 'component': ListTerrainsComponent, pathMatch: 'full'},
  {path : 'clients', 'component': ClientsComponent, pathMatch: 'full', canActivate: [AdminAuthGuard]},
  { path: 'edit-client/:id', component: EditClientComponent },
  {path : 'signUP', 'component': SignUpComponent, pathMatch: 'full'},
  {path : 'signIN', 'component': SigninComponent, pathMatch: 'full'},
  {path : 'terrain/:uuid', 'component': TerrainDetailsComponent, pathMatch: 'full'},
  { path: 'reservations', component: ReservationComponent },
  {path : 'reservation/checkout/:orderUuid', component: CheckoutComponent, pathMatch: 'full'},
  {path: 'reservation/confirmation/:orderUuid', component: ConfirmationComponent, pathMatch: 'full'}
];
