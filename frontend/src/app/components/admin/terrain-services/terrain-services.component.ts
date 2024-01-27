import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {NgOptimizedImage, SlicePipe} from "@angular/common";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {Terrain} from "../../../models/terrain";
import {TerrainService} from "../../../services/terrain/terrain.service";
import Swal from "sweetalert2";
import {Service} from "../../../models/service";
import {
  ButtonCloseDirective, ButtonDirective,
  ModalBodyComponent,
  ModalComponent,
  ModalFooterComponent,
  ModalHeaderComponent, ModalTitleDirective
} from "@coreui/angular";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {TerrainDto} from "../../../models/terrainDto";

@Component({
  selector: 'app-terrain-services',
  standalone: true,
  imports: [
    MatPaginatorModule,
    MatTableModule,
    NgOptimizedImage,
    RouterLink,
    SlicePipe,
    ModalBodyComponent,
    ModalFooterComponent,
    ModalComponent,
    ModalHeaderComponent,
    ButtonCloseDirective,
    ButtonDirective,
    ReactiveFormsModule,
    ModalTitleDirective
  ],
  templateUrl: './terrain-services.component.html',
  styleUrl: './terrain-services.component.css'
})
export class TerrainServicesComponent implements OnInit{
  displayedColumns: string[] = ['uuid', 'icon', 'libelle', 'actions'];
  services: Service[] = []
  dataSource = new MatTableDataSource<Service>(this.services);
  public visible: boolean = false;
  addServiceForm!: FormGroup;
  terrainUuid!: string

  constructor(private terrainService: TerrainService, private route: ActivatedRoute, private fb: FormBuilder) {
    this.addServiceForm = this.fb.group({
      icon: new FormControl('', [Validators.required]),
      libelle: new FormControl('', [Validators.required]),
    })
  }

  toggleLiveDemo() {
    this.visible = !this.visible;
  }

  handleLiveDemoChange(event: any) {
    this.visible = event;
  }

  delete(uuid: string){
    // Swal.fire({
    //   title: "Êtes-vous sûr ?",
    //   text: "Vous ne pourrez pas revenir en arrière !",
    //   icon: "warning",
    //   showCancelButton: true,
    //   confirmButtonColor: "#3085d6",
    //   cancelButtonColor: "#d33",
    //   confirmButtonText: "Oui, supprimez-le !",
    //   cancelButtonText: "Annuler"
    // }).then((result) => {
    //   if (result.isConfirmed) {
    //     this.terrainService.deleteService(uuid).subscribe({
    //       next: res =>{
    //         Swal.fire({
    //           title: "Supprimé !",
    //           text: "Le terrain a été supprimé.",
    //           icon: "success"
    //         });
    //         this.fetchData()
    //       },
    //       error: err => {
    //         Swal.fire({
    //           title: "Non supprimé !",
    //           text: "Le terrain n'a pas été supprimé.",
    //           icon: "error"
    //         });
    //       }
    //     })
    //   }
    // });
  }

  ngOnInit(): void {
    this.route.params.subscribe({
      next: params =>{
        this.terrainUuid = params['terrainUuid']
        this.fetchData(this.terrainUuid)
      }
    })
  }

  fetchData(uuid: string){
    this.terrainService.getServices(uuid).subscribe({
      next: (res: Service[])=>{
        this.services = res;
        this.dataSource = new MatTableDataSource<Service>(this.services);
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  onSubmit() {
    let service : Service = this.addServiceForm.value;
    this.terrainService.addService(this.terrainUuid, service).subscribe({
      next: res =>{
        console.log("Res : " + res)
      },
      error: err =>{
        console.log(err)
      }
    })
  }
}
