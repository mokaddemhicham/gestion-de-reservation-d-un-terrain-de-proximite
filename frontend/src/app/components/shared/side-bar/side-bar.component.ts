import {Component} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import {TerrainsComponent} from "../../admin/terrains/terrains.component";
import {AddTerrainComponent} from "../../admin/add-terrain/add-terrain.component";
import {User} from "../../../models/user";
import {NgIf, NgStyle} from "@angular/common";
import { BreadcrumbModule } from "xng-breadcrumb";
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [
    RouterLink,
    TerrainsComponent,
    RouterOutlet,
    AddTerrainComponent,
    NgIf,
    NgStyle,
    BreadcrumbModule,
    MatIconModule
  ],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent {
  isSidebarActive: boolean = true;
  user = {} as User;

  constructor(private router :Router) {
    const userTmp = sessionStorage.getItem('user')
    if (userTmp) {
      this.user = JSON.parse(userTmp);
    }
  }
  toggleSidebar(){
    this.isSidebarActive = !this.isSidebarActive;
  }

  logout() {
    sessionStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
