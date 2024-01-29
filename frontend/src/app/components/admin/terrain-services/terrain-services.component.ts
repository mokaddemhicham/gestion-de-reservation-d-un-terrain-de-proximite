import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {NgForOf, NgOptimizedImage, SlicePipe} from "@angular/common";
import {ActivatedRoute, RouterLink} from "@angular/router";
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
import {ToastrService} from "ngx-toastr";

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
    ModalTitleDirective,
    NgForOf
  ],
  templateUrl: './terrain-services.component.html',
  styleUrl: './terrain-services.component.css'
})
export class TerrainServicesComponent implements OnInit{
  displayedColumns: string[] = ['uuid', 'icon', 'libelle', 'actions'];
  services: Service[] = []
  allServices: Service[] = []
  dataSource = new MatTableDataSource<Service>(this.services);
  public visible: boolean = false;
  addServiceForm!: FormGroup;
  terrainUuid!: string
  service: Service = {} as Service;

  constructor(private terrainService: TerrainService, private route: ActivatedRoute, private fb: FormBuilder,
              private toastr: ToastrService) {
    this.initForm()
  }

  toggleLiveDemo() {
    this.visible = !this.visible;
  }

  handleLiveDemoChange(event: any) {
    this.visible = event;
  }

  delete(serviceUuid: string){
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
        this.terrainService.deleteService(serviceUuid, this.terrainUuid).subscribe({
          next: res =>{
            Swal.fire({
              title: "Supprimé !",
              text: "Le service a été supprimé.",
              icon: "success"
            });
            this.fetchData(this.terrainUuid)
            this.getAllServicesNotSelected()
          },
          error: err => {
            Swal.fire({
              title: "Non supprimé !",
              text: "Le service n'a pas été supprimé.",
              icon: "error"
            });
          }
        })
      }
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe({
      next: params =>{
        this.terrainUuid = params['terrainUuid']
        this.fetchData(this.terrainUuid)
      }
    })

    this.getAllServicesNotSelected()


  }

  getAllServicesNotSelected(){
    this.terrainService.getAllServices(this.terrainUuid).subscribe({
      next: res => {
        this.allServices = res
      },
      error: err => {
        this.showError(err.toString())
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
        this.showError(err.toString())
      }
    })
  }
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  onSubmit() {
    let selectedServices : string[] = this.addServiceForm.value.services
    let services : Service[] = this.allServices.filter(service => {
      return selectedServices.includes(<string>service.uuid)
    });

    this.terrainService.addServices(this.terrainUuid, services).subscribe({
      next: res =>{
        this.showSuccess("Les services ont été ajoutés avec succès !")
        this.addServiceForm.reset({})
        this.toggleLiveDemo()
        this.fetchData(this.terrainUuid)
        this.getAllServicesNotSelected()
      },
      error: err =>{
        this.showError(err.toString())
      }
    })
  }

  showSuccess(message: string) {
    this.toastr.success(message);
  }

  showError(message: string) {
    this.toastr.error(message);
  }

  private initForm() {
    this.addServiceForm = this.fb.group({
      services: new FormControl([], [Validators.required])
    })
  }
}
