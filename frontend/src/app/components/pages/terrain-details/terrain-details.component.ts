import {Component, OnInit} from '@angular/core';
import {CurrencyPipe, formatDate, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {
  CarouselCaptionComponent,
  CarouselComponent,
  CarouselControlComponent,
  CarouselIndicatorsComponent,
  CarouselInnerComponent,
  CarouselItemComponent,
  NavComponent,
  NavLinkDirective,
  TabContentComponent,
  TabContentRefDirective,
  TabPaneComponent
} from "@coreui/angular";
import {Terrain} from "../../../models/terrain";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {MatInputModule} from "@angular/material/input";
import {DateFilterFn, MatDatepickerInputEvent, MatDatepickerModule} from "@angular/material/datepicker";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatNativeDateModule} from "@angular/material/core";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NavBarComponent} from "../../shared/nav-bar/nav-bar.component";
import {InfoTabComponent} from "../../shared/info-tab/info-tab.component";
import {FooterComponent} from "../../shared/footer/footer.component";
import {TerrainService} from "../../../services/terrain/terrain.service";
import {Reservation} from "../../../models/reservation";
import {ReservationDto} from "../../../models/reservationDto";

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
    InfoTabComponent,
    FooterComponent
  ],
  templateUrl: './terrain-details.component.html',
  styleUrl: './terrain-details.component.css'
})
export class TerrainDetailsComponent implements OnInit{
  terrain: Terrain = {} as Terrain;
  terrainUuid!: string;
  slides: any[] = new Array(1).fill({id: -1, src: '', title: '', subtitle: ''});
  reservationForm!: FormGroup;
  availableHours: number[] = [];
  isAvailables: boolean[] = [];
  constructor(private fb: FormBuilder, private terrainService: TerrainService, private route: ActivatedRoute,
              private router: Router) { }


  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.terrainUuid = params['uuid'];
      this.fetchData(this.terrainUuid);
    });

    this.reservationForm = this.fb.group(
      {
        selectedDate: new FormControl(null, Validators.required),
        time : new FormControl(null, Validators.required)
      }
    )
  }

  fetchData(uuid: string){
    this.terrainService.getTerrain(uuid).subscribe({
      next: res =>{
        this.terrain = res;
      },
      error: err => {
        console.log(err)
      }
    })
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
    const selectedDate = event.value || new Date();
    const formattedDate = this.formatDate(selectedDate)
    console.log(formattedDate)
    this.terrainService.getHeuresAvailables(formattedDate, this.terrainUuid).subscribe({
      next: res =>{
        this.availableHours = Object.keys(res).map(key => parseInt(key, 10));
        this.isAvailables = Object.values(res)
        selectedDate.setDate(selectedDate.getDate()-1)
      },
      error: err => {
        console.log(err)
      }
    })
  }

  getTime() {
    console.log(this.reservationForm.get('time')?.value);
  }


  checkCondition(event: MouseEvent, isAvailable: boolean) {
    if (isAvailable) {
      event.preventDefault(); // Prevent the default action (i.e., checking the radio input)
    }
  }

  formatDate(date: Date): string{
    date.setDate(date.getDate()+1)
    return date.toISOString().slice(0, 10); // Extract the date part in the format 'YYYY-MM-DD'
  }

  onSubmit(){
    let reservation : ReservationDto = {} as ReservationDto;
    reservation.date = this.reservationForm.value.selectedDate
    console.log(reservation.date.getDate()-1)
    reservation.heure = parseInt(this.reservationForm.value.time)
    reservation.user = "02ba7822-aac1-4ca2-979b-4ca5623ae014"
    reservation.terrain = this.terrainUuid
    this.terrainService.addReservation(reservation).subscribe({
      next: res =>{
        console.log(res)
        this.reservationForm.reset({})
        this.router.navigate(['reservation/checkout', res.uuid])
      },
      error: err => {
        console.log(err)
      }
    })
  }

}
