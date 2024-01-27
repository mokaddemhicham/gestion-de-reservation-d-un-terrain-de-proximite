import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {TerrainService} from "../../../services/terrain/terrain.service";
import {ToastrService} from "ngx-toastr";
import {TerrainDto} from "../../../models/terrainDto";
import {ActivatedRoute} from "@angular/router";
import {Terrain} from "../../../models/terrain";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-terrain',
  standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule
    ],
  templateUrl: './edit-terrain.component.html',
  styleUrl: './edit-terrain.component.css'
})
export class EditTerrainComponent implements OnInit{
  editTerrainForm!: FormGroup;
  imageFile!: File;
  terrain: Terrain = {} as Terrain;

  constructor(private fb: FormBuilder, private terrainService: TerrainService, private toastr: ToastrService,
              private route: ActivatedRoute) {
    this.initForm()
  }

  ngOnInit(): void {

        this.route.params.subscribe({
          next: (params)=>{
            const uuid = params["terrainUuid"]
            this.terrainService.getTerrain(uuid).subscribe({
              next: terrain =>{
                this.terrain = terrain
                this.initForm()
            },
              error: err=>{
                this.showError(err.toString())
              }
            })
          },
          error: err =>{
            this.showError(err.toString())
          }
        })
    }

    initForm(){
      this.editTerrainForm = this.fb.group({
        nom: new FormControl(this.terrain.nom, [Validators.required]),
        type: new FormControl(this.terrain.type, [Validators.required]),
        taille: new FormControl(this.terrain.taille, [Validators.required]),
        prix: new FormControl(this.terrain.prix, [Validators.required, Validators.min(0)]),
        addresse: new FormControl(this.terrain.addresse, [Validators.required]),
        localisation: new FormControl(this.terrain.localisation, [Validators.required]),
        image: new FormControl(null),
        description: new FormControl(this.terrain.description, [Validators.required])
      });
    }

  onSubmit() {
    let terrain : TerrainDto = this.editTerrainForm.value;
    terrain.proprietaire = this.terrain.proprietaire.uuid
    terrain.uuid = this.terrain.uuid
    if (this.imageFile == undefined){
      terrain.image = this.terrain.image
    }


    this.terrainService.updateTerrain(terrain, this.imageFile).subscribe({
      next: (res)=>{
        this.showSuccess()
      },
      error: (err)=>{
        this.showError(err.toString())
        console.log(err);
      }
    })

  }

  onFileChange(event: any){
    // @ts-ignore
    this.imageFile = (event.target as HTMLInputElement).files[0];
  }

  showSuccess() {
    this.toastr.success('Mise à jour réussie !');
  }

  showError(message: string) {
    this.toastr.error(message);
  }

}
