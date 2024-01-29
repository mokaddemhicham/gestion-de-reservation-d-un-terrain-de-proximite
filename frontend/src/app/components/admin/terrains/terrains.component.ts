import {Component, OnInit, ViewChild} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {Terrain} from "../../../models/terrain";
import {
  ButtonCloseDirective,
  ButtonDirective, FormControlDirective, FormDirective, FormLabelDirective, FormModule, FormTextDirective,
  ModalBodyComponent,
  ModalComponent,
  ModalFooterComponent,
  ModalHeaderComponent, ModalTitleDirective
} from "@coreui/angular";
import {RouterLink} from "@angular/router";
import {TerrainService} from "../../../services/terrain/terrain.service";
import {NgOptimizedImage, SlicePipe} from "@angular/common";
import Swal from "sweetalert2";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {FooterComponent} from "../../shared/footer/footer.component";
import {MySwiperComponent} from "../../shared/my-swiper/my-swiper.component";

@Component({
  selector: 'app-terrains',
  standalone: true,
    imports: [
        MatCardModule,
        MatPaginatorModule,
        MatTableModule,
        ModalHeaderComponent,
        ModalBodyComponent,
        ModalComponent,
        ModalFooterComponent,
        ButtonDirective,
        ModalTitleDirective,
        ButtonCloseDirective,
        FormModule,
        FormDirective,
        FormLabelDirective,
        FormControlDirective,
        FormTextDirective,
        RouterLink,
        NgOptimizedImage,
        SlicePipe,
        FooterComponent,
        MySwiperComponent,

    ],
  templateUrl: './terrains.component.html',
  styleUrl: './terrains.component.css'
})
export class TerrainsComponent implements OnInit{
  displayedColumns: string[] = ['uuid', 'image', 'nom', 'prix', 'taille', 'proprietaire','services', 'disponibilités', 'actions'];
  terrains: Terrain[] = []

  dataSource = new MatTableDataSource<Terrain>(this.terrains);

  constructor(private terrainService: TerrainService) {
  }

  delete(uuid: string){
    Swal.fire({
      title: "Êtes-vous sûr ?",
      text: "Vous ne pourrez pas revenir en arrière !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui, supprimez-le !",
      cancelButtonText: "Annuler"
    }).then((result) => {
      if (result.isConfirmed) {
        this.terrainService.deleteTerrain(uuid).subscribe({
          next: res =>{
            Swal.fire({
              title: "Supprimé !",
              text: "Le terrain a été supprimé.",
              icon: "success"
            });
            this.fetchData()
          },
          error: err => {
            Swal.fire({
              title: "Non supprimé !",
              text: "Le terrain n'a pas été supprimé.",
              icon: "error"
            });
          }
        })
      }
    });
  }

  ngOnInit(): void {
    this.fetchData()
  }

  fetchData(){
    this.terrainService.getTerrains().subscribe({
      next: (res: Terrain[])=>{
        this.terrains = res;
        this.dataSource = new MatTableDataSource<Terrain>(this.terrains);
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
  @ViewChild(MatPaginator) paginator!: MatPaginator;

}
