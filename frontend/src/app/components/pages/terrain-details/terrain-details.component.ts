import {Component, OnInit} from '@angular/core';
import {CurrencyPipe, NgForOf, NgOptimizedImage} from "@angular/common";
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
    ReactiveFormsModule
  ],
  templateUrl: './terrain-details.component.html',
  styleUrl: './terrain-details.component.css'
})
export class TerrainDetailsComponent implements OnInit{
  terrain!: Terrain;
  slides: any[] = new Array(3).fill({id: -1, src: '', title: '', subtitle: ''});
  reservationForm!: FormGroup;
  availableHours: number[] = [];
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {

    this.reservationForm = this.fb.group(
      {
        selectedDate: new FormControl(null)
      }
    )

    this.slides[0] = {
      id: 0,
      src: './assets/images/stadium_1.jpg',
      title: 'First slide',
      subtitle: 'Nulla vitae elit libero, a pharetra augue mollis interdum.'
    };
    this.slides[1] = {
      id: 1,
      src: './assets/images/stadium_2.jpg',
      title: 'Second slide',
      subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    }
    this.slides[2] = {
      id: 2,
      src: './assets/images/stadium_3.jpg',
      title: 'Third slide',
      subtitle: 'Praesent commodo cursus magna, vel scelerisque nisl consectetur.'
    };

    const fakeProprietaire: ProprietaireTerrain = {
      uuid: '1',
      nom: 'John',
      prenom: 'Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      telephone: '123-456-7890',
      adresse: '123 Main St',
      cin: 'AB123456',
      terrains: [], // Leave it empty for now
    };

// Generate fake data for Service
    const fakeService: Service = {
      uuid: '1',
      libelle: 'Shower',
      icon: 'fa-solid fa-shower',
      terrains: [], // Leave it empty for now
    };

// Generate fake data for Disponibilite
    const fakeDisponibilite: Disponibilite = {
      uuid: '1',
      jour: 'Monday',
      heureDebut: 14,
      heureFin: 16,
      terrain: [], // Leave it empty for now
    };

// Generate fake data for Terrain
    this.terrain = {
      uuid: '1',
      name: 'Sample Terrain',
      description: 'A beautiful sports terrain',
      image: 'assets/images/stadium_1.jpg',
      price: 50,
      taille: '10x10',
      adresse: '123 Main St',
      localisation: 'Cityville',
      type: 'Football Field',
      proprietaire: fakeProprietaire,
      services: [fakeService],
      disponibilites: [fakeDisponibilite],
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

    // Access the selected date from the form control if needed:
    // const selectedDateFromForm = this.reservationForm.get('selectedDate').value;

    // Perform any actions based on the selected date, e.g.,
    // - Check for availability
    // - Calculate prices
    // - Update other UI elements
  }

  private generateAvailableHours(date: Date): number[] {
    // Add your logic to determine available hours based on the selected date
    // For simplicity, this example returns hours from 8 to 23
    const startHour = 8;
    const endHour = 23;
    return Array.from({ length: endHour - startHour + 1 }, (_, index) => startHour + index);
  }

}
