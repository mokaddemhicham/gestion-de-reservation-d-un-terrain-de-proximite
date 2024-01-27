import {Component} from '@angular/core';
import {RouterLink, RouterOutlet} from "@angular/router";
import {TerrainsComponent} from "../../admin/terrains/terrains.component";
import {AddTerrainComponent} from "../../admin/add-terrain/add-terrain.component";

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [
    RouterLink,
    TerrainsComponent,
    RouterOutlet,
    AddTerrainComponent
  ],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent {
  isSidebarActive: boolean = true;


  toggleSidebar(){
    this.isSidebarActive = !this.isSidebarActive;
  }
}
