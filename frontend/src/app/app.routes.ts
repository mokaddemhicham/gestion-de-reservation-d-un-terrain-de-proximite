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
import {AuthGuardLogged} from "./guards/alreadyLogged/auth-logged.guard";
import {DashboardComponent} from "./components/admin/dashboard/dashboard.component";
import {HomeComponent} from "./components/pages/home/home.component";

export const routes: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full'},
  {path : 'terrains', 'component': ListTerrainsComponent, pathMatch: 'full',data: { breadcrumb: 'Terrains' }},
  {path : 'terrains/:uuid', 'component': TerrainDetailsComponent, pathMatch: 'full',data: { breadcrumb: 'Terrain Details' }},
  {path: 'edit-client/:id', component: EditClientComponent ,data: { breadcrumb: 'Edit Client' } },
  {path : 'signUP', 'component': SignUpComponent, pathMatch: 'full', data: { breadcrumb: 'Sign Up' }},
  {path : 'login', 'component': SigninComponent, pathMatch: 'full' , canActivate: [AuthGuardLogged],  data: { breadcrumb: 'Login' } },
  {path : 'terrain/:uuid', 'component': TerrainDetailsComponent, pathMatch: 'full',data: { breadcrumb: 'Terrain Details' }},
  {path : 'reservation/checkout/:orderUuid', component: CheckoutComponent, pathMatch: 'full', data: { breadcrumb: 'Checkout' }},
  {path: 'reservation/confirmation/:orderUuid', component: ConfirmationComponent, pathMatch: 'full', data: { breadcrumb: 'Confirmation' } },
  {path: 'admin', component: SideBarComponent,data: { breadcrumb: 'Admin' }, canActivate: [AdminAuthGuard] ,children: [
      {path: '', component: DashboardComponent, pathMatch: 'full', data: { breadcrumb: 'Dashboard' }},
      {path : 'users', 'component': ClientsComponent, pathMatch: 'full', data: {breadcrumb:'Users'}},
      {path: 'terrains', component: TerrainsComponent, pathMatch: 'full', data: { breadcrumb: 'Terrains' }},
      { path: 'reservations', component: ReservationComponent, data: { breadcrumb: 'Reservations' } },
      {path: 'terrains/add', component: AddTerrainComponent, pathMatch: 'full', data: { breadcrumb: 'Add Terrain' }},
      {path: 'terrains/edit/:terrainUuid', component: EditTerrainComponent, pathMatch: 'full', data: { breadcrumb: 'Edit Terrain' }},
      {path: 'terrains/:terrainUuid/services', component: TerrainServicesComponent, pathMatch: 'full', data: { breadcrumb: 'Terrain Services' }},
      {path: 'terrains/:terrainUuid/disponibilites', component: TerrainDisponibilitesComponent, pathMatch: 'full', data: { breadcrumb: 'Terrain Disponibilites' }},
    ]}
];
