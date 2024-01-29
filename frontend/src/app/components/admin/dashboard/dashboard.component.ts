import { Component } from '@angular/core';
import {TerrainService} from "../../../services/terrain/terrain.service";
import {ClientService} from "../../../services/client/client.service";
import {ReservationService} from "../../../services/reservation/reservation.service";
import {BarChartModule, Color, NgxChartsModule, ScaleType} from '@swimlane/ngx-charts';
import {MatCardModule} from "@angular/material/card";
import {MonthlyReservation} from "../../../models/monthlyReservation";
import {NgForOf} from "@angular/common";
import {single} from "rxjs";
import {Reservation} from "../../../models/reservation";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    BarChartModule,
    MatCardModule,
    NgForOf,
    NgxChartsModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  terrainCount: number = 0;
  userCount: number = 0;
  reservationCount: number = 0;
  proprietaireCount: number = 0;
  monthlyReservations: MonthlyReservation[] = [];

  name = 'Angular';

  multi: any[]= [];

  view: [number, number] = [700, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Country';
  showYAxisLabel = true;
  yAxisLabel = 'Reservation';


  colorScheme: Color = {
    name: 'myScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'],
  };
  chartData: { name: string; value: number }[] = [];
  chartDataCirculaire: { name: string; value: number }[] = [];


  constructor(private terrainService : TerrainService, private clientService : ClientService,
  private reservationService : ReservationService) {}


  ngOnInit(): void {
    this.terrainService.getTerrainCount().subscribe((count)=>{
      this.terrainCount = count;
      if (this.chartDataCirculaire){
        this.chartDataCirculaire[0].value = count+30;
      }

    })
    this.clientService.getUserCount().subscribe((count)=>{
      this.userCount = count;
      if (this.chartDataCirculaire){
        this.chartDataCirculaire[1].value = count+30;
      }

    })
    this.reservationService.getReservationCount().subscribe((count)=>{
      this.reservationCount = count;
      this.chartDataCirculaire[2].value = count+30;
    })
    this.clientService.getPrioprietaireCount().subscribe((count)=>{
      this.proprietaireCount = this.userCount + count;
      this.chartDataCirculaire[3].value = count+30;
    })
    this.chartDataCirculaire = [

      { name: 'Terrains', value: this.terrainCount },
      { name: 'Users', value: this.userCount },
      { name: 'Reservations', value: this.reservationCount },
      { name: 'Proprietaires', value: this.proprietaireCount },
    ];

    console.log(this.chartDataCirculaire);

    this.reservationService.getMonthlyReservation().subscribe((data)=>{
      this.monthlyReservations = data;
      // Transform the data to match ngx-charts expected format
      if (this.monthlyReservations) {
        this.chartData = this.monthlyReservations.map(item => ({
          name: item.month,
          value: item.numberOfReservations
        }));
        const month2:string[]  =[];
        for (const tmp in this.monthlyReservations) {
          month2.push(this.monthlyReservations[tmp].month);
          console.log(this.monthlyReservations[tmp].month);
        }
        const months=['Janvier','Fevrier','Mars','Avril','Mai','Juin','Juillet','Aout','Septembre',];
        for (let i = 1; i < months.length; i++) {
          if (!month2.includes(months[i])){
            this.chartData.push({name:months[i],value:0});
          }

        }

      }
    })

  }

  protected readonly single = single;
}
