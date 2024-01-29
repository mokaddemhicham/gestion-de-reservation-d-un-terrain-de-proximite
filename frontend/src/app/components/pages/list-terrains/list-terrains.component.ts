import {Component, OnInit} from '@angular/core';
import {CardTerrainComponent} from "../../shared/card-terrain/card-terrain.component";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {TerrainSearchComponent} from "../../shared/terrain-search/terrain-search.component";
import {InfoTabComponent} from "../../shared/info-tab/info-tab.component";
import {MySwiperComponent} from "../../shared/my-swiper/my-swiper.component";
import {NavBarComponent} from "../../shared/nav-bar/nav-bar.component";
import {FooterComponent} from "../../shared/footer/footer.component";
import {HeaderSectionComponent} from "../../shared/header-section/header-section.component";
import {PageableDto} from "../../../models/pageableDto";
import {Terrain} from "../../../models/terrain";
import {TerrainService} from "../../../services/terrain/terrain.service";
import {MatPaginatorModule} from "@angular/material/paginator";
import {User} from "../../../models/user";
import {TeamComponent} from "../../shared/team/team.component";

@Component({
  selector: 'app-list-terrains',
  standalone: true,
  imports: [
    CardTerrainComponent,
    NgForOf,
    TerrainSearchComponent,
    InfoTabComponent,
    MySwiperComponent,
    NavBarComponent,
    FooterComponent,
    HeaderSectionComponent,
    MatPaginatorModule,
    NgClass,
    NgIf,
    TeamComponent
  ],
  templateUrl: './list-terrains.component.html',
  styleUrl: './list-terrains.component.css'
})
export class ListTerrainsComponent implements OnInit{
  terrainsPageable: PageableDto<Terrain> = {} as PageableDto<Terrain>;
  totalElements: number = 0;
  user:User;

  constructor(private terrainService: TerrainService) {
    this.user = JSON.parse(sessionStorage.getItem('user') || '{}');
    console.log("user",this.user);
  }

  ngOnInit(): void {
    this.fetchData()
  }

  fetchData(page: number = 0, size: number = 6){
    this.terrainService.getAllTerrainsPageable(page, size).subscribe({
      next: res=> {
        this.terrainsPageable = res;
        this.totalElements = this.terrainsPageable.pages.length
      },
      error: err => {
        console.log(err)
      }
    })
  }

  goToPage(i: number) {
    this.fetchData(i)
  }
}
