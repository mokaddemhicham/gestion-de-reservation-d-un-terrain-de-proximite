import {Component, OnInit, ViewChild} from '@angular/core';
import {
    ButtonCloseDirective,
    ButtonDirective,
    ModalBodyComponent,
    ModalComponent,
    ModalFooterComponent, ModalHeaderComponent, ModalTitleDirective
} from "@coreui/angular";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {NgForOf} from "@angular/common";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {TerrainService} from "../../../services/terrain/terrain.service";
import {ActivatedRoute} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import Swal from "sweetalert2";
import {Disponibilite} from "../../../models/disponibilite";

@Component({
  selector: 'app-terrain-disponibilites',
  standalone: true,
    imports: [
        ButtonCloseDirective,
        ButtonDirective,
        MatPaginatorModule,
        MatTableModule,
        ModalBodyComponent,
        ModalComponent,
        ModalFooterComponent,
        ModalHeaderComponent,
        ModalTitleDirective,
        NgForOf,
        ReactiveFormsModule
    ],
  templateUrl: './terrain-disponibilites.component.html',
  styleUrl: './terrain-disponibilites.component.css'
})
export class TerrainDisponibilitesComponent implements OnInit{
  displayedColumns: string[] = ['uuid', 'jour', 'heureDebut', 'heureFin', 'actions'];
  disponibilites: Disponibilite[] = []
  dataSource = new MatTableDataSource<Disponibilite>(this.disponibilites);
  public visible: boolean = false;
  // Define an array to track the visibility of each modal
  public modalVisibility: boolean[] = new Array(this.disponibilites.length).fill(false)
  addDisponibiliteForm!: FormGroup;
  editDisponibiliteForm!: FormGroup;
  terrainUuid!: string
  days: any[] = [
    { "key": "Monday", "value": "Lundi" },
    { "key": "Tuesday", "value": "Mardi" },
    { "key": "Wednesday", "value": "Mercredi" },
    { "key": "Thursday", "value": "Jeudi" },
    { "key": "Friday", "value": "Vendredi" },
    { "key": "Saturday", "value": "Samedi" },
    { "key": "Sunday", "value": "Dimanche" }
  ];


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

  // Method to toggle the visibility of a specific modal
  toggleModal(index: number) {
    this.modalVisibility[index] = !this.modalVisibility[index];
  }

// Method to handle changes in modal visibility
  handleModalChange(event: any, index: number) {
    this.modalVisibility[index] = event;
  }

  delete(disponibiliteUuid: string){
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
        this.terrainService.deleteDisponibilite(disponibiliteUuid, this.terrainUuid).subscribe({
          next: res =>{
            Swal.fire({
              title: "Supprimé !",
              text: "La disponibilite a été supprimé.",
              icon: "success"
            });
            this.fetchData(this.terrainUuid)
          },
          error: err => {
            Swal.fire({
              title: "Non supprimé !",
              text: "La disponibilite n'a pas été supprimé.",
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

    // Initialisation du formulaire d'édition
    this.editDisponibiliteForm = this.fb.group({
      edit_uuid: new FormControl('', [Validators.required]),
      edit_jour: ['', Validators.required], // Ajoutez des validateurs si nécessaire
      edit_heureDebut: ['', Validators.required],
      edit_heureFin: ['', Validators.required]
    });


  }

  fetchData(uuid: string){
    this.terrainService.getDisponibilitesByTerrain(uuid).subscribe({
      next: (res: Disponibilite[])=>{
        this.disponibilites = res;
        this.daysFilter()
        this.dataSource = new MatTableDataSource<Disponibilite>(this.disponibilites);
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        this.showError(err.toString())
      }
    })
  }
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  onSubmit() {
    let disponibilite : Disponibilite = this.addDisponibiliteForm.value
    console.log(disponibilite)
    this.terrainService.addDisponibilite(this.terrainUuid, disponibilite).subscribe({
      next: res =>{
        this.showSuccess("La disponibilite a été ajouté avec succès !")
        this.addDisponibiliteForm.reset({})
        this.toggleLiveDemo()
        this.fetchData(this.terrainUuid)
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
    this.addDisponibiliteForm = this.fb.group({
      jour: new FormControl(null, [Validators.required]),
      heureDebut: new FormControl(null, [Validators.required]),
      heureFin: new FormControl(null, [Validators.required])
    })
  }

  daysFilter() {
    let dispoDays: string[] = [];
    this.disponibilites.forEach(d => {
      dispoDays.push(d.jour);
    });
    this.days = this.days.filter(day => {
      return !dispoDays.includes(day.key);
    });
    return this.days;
  }

  // Fonction pour préremplir le formulaire avec les valeurs actuelles de l'élément
  fillEditForm(element: any) {
    this.editDisponibiliteForm.patchValue({
      edit_uuid: element.uuid,
      edit_jour: element.jour,
      edit_heureDebut: element.heureDebut,
      edit_heureFin: element.heureFin
    });
  }

  onEdit() {
    let disponiblite: Disponibilite = {} as Disponibilite;
    disponiblite.jour = this.editDisponibiliteForm.value.edit_jour
    disponiblite.heureDebut = this.editDisponibiliteForm.value.edit_heureDebut
    disponiblite.heureFin = this.editDisponibiliteForm.value.edit_heureFin
    disponiblite.uuid = this.editDisponibiliteForm.value.edit_uuid

    this.terrainService.editDisponibilite(this.terrainUuid, disponiblite).subscribe({
      next: res => {
        this.showSuccess("Mise à jour réussie !");
        this.fetchData(this.terrainUuid)
      },
      error: err => {
        console.log(err)
      }
    })
  }
}
