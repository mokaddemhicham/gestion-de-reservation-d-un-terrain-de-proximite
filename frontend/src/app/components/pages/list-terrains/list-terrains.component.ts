import { Component } from '@angular/core';
import {CardTerrainComponent} from "../../shared/card-terrain/card-terrain.component";
import {NgForOf} from "@angular/common";
import {TerrainSearchComponent} from "../../shared/terrain-search/terrain-search.component";
import {InfoTabComponent} from "../../shared/info-tab/info-tab.component";
import {MySwiperComponent} from "../../shared/my-swiper/my-swiper.component";
import {NavBarComponent} from "../../shared/nav-bar/nav-bar.component";
import {FooterComponent} from "../../shared/footer/footer.component";
import {HeaderSectionComponent} from "../../shared/header-section/header-section.component";

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
    HeaderSectionComponent
  ],
  templateUrl: './list-terrains.component.html',
  styleUrl: './list-terrains.component.css'
})
export class ListTerrainsComponent {
  terrains: any[] = [
    {
      'id': 1,
      'name': 'Terrain A',
      'taille': '5x5',
      'price': '30€/h',
      'image': 'assets/images/stadium_1.jpg',
      'location': 'Berrechid',
      'services': [
        { 'name': 'Douche', 'icon': 'fa-solid fa-shower' },
        { 'name': 'Vestiaire', 'icon': 'bi bi-door-open' },
        { 'name': 'Éclairage', 'icon': 'bi bi-lightbulb' },
      ]
    },
    {
      'id': 2,
      'name': 'Terrain B',
      'taille': '6x6',
      'price': '35€/h',
      'image': 'assets/images/stadium_2.jpg',
      'location': 'Casablanca',
      'services': [
        { 'name': 'Douche', 'icon': 'fa-solid fa-shower' },
        { 'name': 'Cafeteria', 'icon': 'bi bi-cup-hot' },
        { 'name': 'Wi-Fi', 'icon': 'bi bi-wifi' },
      ]
    },
    {
      'id': 3,
      'name': 'Terrain C',
      'taille': '7x7',
      'price': '40€/h',
      'image': 'assets/images/stadium_3.jpg',
      'location': 'Rabat',
      'services': [
        { 'name': 'Douche', 'icon': 'fa-solid fa-shower' },
        { 'name': 'Parking', 'icon': 'bi bi-p-circle' },
        { 'name': 'Écran géant', 'icon': 'bi bi-tv' },
      ]
    },
    {
      'id': 4,
      'name': 'Terrain D',
      'taille': '8x8',
      'price': '45€/h',
      'image': 'assets/images/stadium_4.jpg',
      'location': 'Marrakech',
      'services': [
        { 'name': 'Douche', 'icon': 'fa-solid fa-shower' },
        { 'name': 'Barbecue', 'icon': 'bi bi-fire' },
        { 'name': 'Musique', 'icon': 'bi bi-music-note' },
      ]
    },
    {
      'id': 5,
      'name': 'Terrain E',
      'taille': '9x9',
      'price': '50€/h',
      'image': 'assets/images/stadium_5.jpg',
      'location': 'Agadir',
      'services': [
        { 'name': 'Douche', 'icon': 'fa-solid fa-shower' },
        { 'name': 'Snack', 'icon': 'bi bi-basket' },
        { 'name': 'Chaises longues', 'icon': 'bi bi-chair' },
      ]
    },
    {
      'id': 6,
      'name': 'Terrain F',
      'taille': '10x10',
      'price': '55€/h',
      'image': 'assets/images/stadium_6.jpg',
      'location': 'Fes',
      'services': [
        { 'name': 'Douche', 'icon': 'fa-solid fa-shower' },
        { 'name': 'Photographe', 'icon': 'bi bi-camera' },
        { 'name': 'Décoration', 'icon': 'bi bi-emoji-heart-eyes' },
      ]
    },
  ];
}
