import {Component, OnInit} from '@angular/core';
import {CurrencyPipe, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {
  CarouselCaptionComponent,
  CarouselComponent,
  CarouselControlComponent, CarouselIndicatorsComponent,
  CarouselInnerComponent,
  CarouselItemComponent, NavComponent, NavLinkDirective, TabContentComponent, TabContentRefDirective, TabPaneComponent
} from "@coreui/angular";
import {Terrain} from "../../../models/terrain";
import {Disponibilite} from "../../../models/disponibilite";
import {Service} from "../../../models/service";
import {ProprietaireTerrain} from "../../../models/proprietaire-terrain";
import {RouterLink} from "@angular/router";
import {MatInputModule} from "@angular/material/input";
import {DateFilterFn, MatDatepickerInputEvent, MatDatepickerModule} from "@angular/material/datepicker";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatNativeDateModule} from "@angular/material/core";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {NavBarComponent} from "../../shared/nav-bar/nav-bar.component";
import {InfoTabComponent} from "../../shared/info-tab/info-tab.component";

@Component({
  selector: 'app-terrain',
  standalone: true,
  imports: [
    NgForOf,
    CarouselComponent,
    CarouselInnerComponent,
    CarouselItemComponent,
    CarouselControlComponent,
    CarouselIndicatorsComponent,
    CarouselCaptionComponent,
    CurrencyPipe,
    TabContentComponent,
    TabPaneComponent,
    NavComponent,
    TabContentRefDirective,
    RouterLink,
    NavLinkDirective,
    MatInputModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    NgOptimizedImage,
    ReactiveFormsModule,
    NgIf,
    NavBarComponent,
    InfoTabComponent
  ],
  templateUrl: './terrain-details.component.html',
  styleUrl: './terrain-details.component.css'
})
export class TerrainDetailsComponent implements OnInit{
  terrain!: Terrain;
  slides: any[] = new Array(3).fill({id: -1, src: '', title: '', subtitle: ''});
  reservationForm!: FormGroup;
  availableHours: number[] = [];
  numbers : number[] = [8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {

    this.reservationForm = this.fb.group(
      {
        selectedDate: new FormControl(null),
        time : new FormControl(null)
      }
    )

    this.slides[0] = {
      id: 0,
      src: './assets/images/stadium_1.jpg',
      title: 'Havre de Paix',
      subtitle: 'Nulla vitae elit libero, a pharetra augue mollis interdum.'
    };
    this.slides[1] = {
      id: 1,
      src: './assets/images/stadium_2.jpg',
      title: 'Havre de Paix',
      subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    }
    this.slides[2] = {
      id: 2,
      src: './assets/images/stadium_3.jpg',
      title: 'Havre de Paix',
      subtitle: 'Praesent commodo cursus magna, vel scelerisque nisl consectetur.'
    };

    const fakeProprietaire: ProprietaireTerrain = {
      uuid: '1',
      nom: 'Mokaddem',
      prenom: 'Hicham',
      email: 'contact@mokaddemhicham.tech',
      password: 'password123',
      telephone: '+212 697 332 933',
      adresse: '123 Main St',
      cin: 'AB123456',
      terrains: [], // Leave it empty for now
    };

// Generate fake data for Service
    const fakeService: Service[] = [
      {
        uuid: '1',
        libelle: 'Douche',
        icon: 'fa-solid fa-shower',
        terrains: [], // Laissez-le vide pour le moment
      },
      {
        uuid: '2',
        libelle: 'Cafeteria',
        icon: 'bi bi-cup-hot',
        terrains: [],
      },
      {
        uuid: '3',
        libelle: 'Wi-Fi',
        icon: 'bi bi-wifi',
        terrains: [],
      },
      {
        uuid: '4',
        libelle: 'Parking',
        icon: 'bi bi-p-circle',
        terrains: [],
      },
      {
        uuid: '5',
        libelle: 'Éclairage',
        icon: 'bi bi-lightbulb',
        terrains: [],
      },
    ];

// Generate fake data for Disponibilite
    const fakeDisponibilite: Disponibilite[] = [
      {
        uuid: '1',
        jour: 'Lundi',
        heureDebut: 14,
        heureFin: 16,
        terrain: [], // Laissez-le vide pour le moment
      },
      {
        uuid: '2',
        jour: 'Mardi',
        heureDebut: 10,
        heureFin: 12,
        terrain: [],
      },
      {
        uuid: '3',
        jour: 'Mercredi',
        heureDebut: 16,
        heureFin: 18,
        terrain: [],
      },
      {
        uuid: '4',
        jour: 'Jeudi',
        heureDebut: 12,
        heureFin: 14,
        terrain: [],
      },
      {
        uuid: '5',
        jour: 'Vendredi',
        heureDebut: 8,
        heureFin: 10,
        terrain: [],
      },
      {
        uuid: '6',
        jour: 'Samedi',
        heureDebut: 18,
        heureFin: 20,
        terrain: [],
      },
      {
        uuid: '7',
        jour: 'Dimanche',
        heureDebut: 20,
        heureFin: 22,
        terrain: [],
      },
    ];

// Generate fake data for Terrain
    this.terrain = {
      uuid: '54a9f5d6-54f1-45c7-9542-4b5c54a9f4a5',
      name: 'Havre de Paix',
      description: 'Terrain constructible de 5000 m², situé dans un quartier calme et verdoyant de Salé. Vue imprenable sur la mer et les montagnes. Idéal pour une maison familiale ou une retraite paisible.',
      image: 'assets/images/stadium_1.jpg',
      price: 50,
      taille: '10x10',
      adresse: '123 Chemin des Lilas, Salé',
      localisation: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3397.238595280296!2d-8.052004925638188!3d31.627317041852702!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdafe9f0ca6b3a9f%3A0x8eb4b9f17c64224a!2z2YXZhNin2LnYqCDYp9mE2YLYsdioINij2LLZhNmK!5e0!3m2!1sfr!2sma!4v1704115134685!5m2!1sfr!2sma',
      type: 'Terrain constructible',
      proprietaire: fakeProprietaire,
      services: fakeService,
      disponibilites: fakeDisponibilite,
      reservations: [], // Leave it empty for now
    };

  }

  dateFilter : DateFilterFn<Date | null> = (date: Date | null) => {
    return this.isEnabledDate(date || new Date());
  }

  isEnabledDate = (date : Date | null): boolean => {
    // Disable dates before today
    const today: Date = new Date();
    // Disable dates before today
    if (date && date < today && !this.isSameDate(date, today)) {
      return false;
    }
    // Disable specific days after today

    const disabledDays: Date[] = [
      new Date(2024, 0, 10), // April 10, 2023
      new Date(2024, 0, 15), // May 15, 2023
      new Date(2024, 0, 4),  // July 1, 2023
    ];

    if (date && disabledDays.some(disabledDay => this.isSameDate(date, disabledDay))) {
      return false;
    }

    // Enable all other dates
    return true;
  }

  private isSameDate(date1: Date, date2: Date): boolean {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );

  }

  onDateChange(event: MatDatepickerInputEvent<Date>) {
    const selectedDate = event.value;
    console.log('Selected date:', selectedDate);
    this.availableHours = this.generateAvailableHours(selectedDate || new Date());
  }

  private generateAvailableHours(date: Date): number[] {
    // Add your logic to determine available hours based on the selected date
    // For simplicity, this example returns hours from 8 to 23
    const startHour = 8;
    const endHour = 23;
    return Array.from({ length: endHour - startHour + 1 }, (_, index) => startHour + index);
  }

  getTime() {
    console.log(this.reservationForm.get('time')?.value);
  }

}
