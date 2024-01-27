import { Routes } from '@angular/router';
import {ListTerrainsComponent} from "./components/pages/list-terrains/list-terrains.component";
import {TerrainDetailsComponent} from "./components/pages/terrain-details/terrain-details.component";
import {CheckoutComponent} from "./components/pages/checkout/checkout.component";
import {ConfirmationComponent} from "./components/pages/confirmation/confirmation.component";
import {SideBarComponent} from "./components/shared/side-bar/side-bar.component";
import {TerrainsComponent} from "./components/admin/terrains/terrains.component";
import {AddTerrainComponent} from "./components/admin/add-terrain/add-terrain.component";
import {EditTerrainComponent} from "./components/admin/edit-terrain/edit-terrain.component";
import {TerrainServicesComponent} from "./components/admin/terrain-services/terrain-services.component";
import {
  TerrainDisponibilitesComponent
} from "./components/admin/terrain-disponibilites/terrain-disponibilites.component";
import {SignUpComponent} from "./components/shared/sign-up/sign-up.component";
import {ClientsComponent} from "./components/admin/clients/clients.component";
import {EditClientComponent} from "./components/shared/edit-client/edit-client.component";
import {SigninComponent} from "./components/shared/signin/signin.component";
import {AdminAuthGuard} from "./guards/auth.guard";
import {ReservationComponent} from "./components/shared/reservation/reservation.component";
export const routes: Routes = [
  {path: '', redirectTo: 'terrains', pathMatch: 'full'},
  {path : 'terrains', 'component': ListTerrainsComponent, pathMatch: 'full'},
  {path : 'terrains/:uuid', 'component': TerrainDetailsComponent, pathMatch: 'full'},
  {path : 'clients', 'component': ClientsComponent, pathMatch: 'full', canActivate: [AdminAuthGuard]},
  { path: 'edit-client/:id', component: EditClientComponent },
  {path : 'signUP', 'component': SignUpComponent, pathMatch: 'full'},
  {path : 'login', 'component': SigninComponent, pathMatch: 'full'},
  {path : 'terrain/:uuid', 'component': TerrainDetailsComponent, pathMatch: 'full'},
  { path: 'reservations', component: ReservationComponent },
  {path : 'reservation/checkout/:orderUuid', component: CheckoutComponent, pathMatch: 'full'},
  {path: 'reservation/confirmation/:orderUuid', component: ConfirmationComponent, pathMatch: 'full'},
  {path: 'admin', component: SideBarComponent, children: [
      {path: 'terrains', component: TerrainsComponent, pathMatch: 'full'},
      {path: 'terrains/add', component: AddTerrainComponent, pathMatch: 'full'},
      {path: 'terrains/edit/:terrainUuid', component: EditTerrainComponent, pathMatch: 'full'},
      {path: 'terrains/:terrainUuid/services', component: TerrainServicesComponent, pathMatch: 'full'},
      {path: 'terrains/:terrainUuid/disponibilites', component: TerrainDisponibilitesComponent, pathMatch: 'full'},
    ]}
];
