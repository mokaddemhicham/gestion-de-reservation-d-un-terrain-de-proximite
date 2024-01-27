import {Component, OnInit} from '@angular/core';
import {ButtonDirective, FormControlDirective, FormDirective, FormLabelDirective} from "@coreui/angular";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {TerrainService} from "../../../services/terrain/terrain.service";
import {TerrainDto} from "../../../models/terrainDto";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-add-terrain',
  standalone: true,
  imports: [
    ButtonDirective,
    FormControlDirective,
    FormDirective,
    FormLabelDirective,
    ReactiveFormsModule
  ],
  templateUrl: './add-terrain.component.html',
  styleUrl: './add-terrain.component.css'
})
export class AddTerrainComponent{
  addTerrainForm!: FormGroup;
  imageFile!: File;

  constructor(private fb: FormBuilder, private terrainService: TerrainService, private toastr: ToastrService) {
    this.addTerrainForm = this.fb.group({
      nom: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
      taille: new FormControl('', [Validators.required]),
      prix: new FormControl(0, [Validators.required, Validators.min(0)]),
      addresse: new FormControl('', [Validators.required]),
      localisation: new FormControl('', [Validators.required]),
      image: new FormControl(null, [Validators.required]),
      description: new FormControl('', [Validators.required])
    })

  }

  onSubmit() {
    let terrain : TerrainDto = this.addTerrainForm.value;

    terrain.proprietaire = "15a96b2f-c124-466a-91ea-71a8c089e775";

    this.terrainService.addTerrain(terrain, this.imageFile).subscribe({
      next: (res)=>{
        this.addTerrainForm.reset({})
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
    this.toastr.success('Le terrain a été ajouté avec succès !');
  }

  showError(message: string) {
    this.toastr.error(message);
  }

  showWarning() {
    this.toastr.warning('This is a warning message.', 'Warning');
  }

  showInfo() {
    this.toastr.info('This is an info message.', 'Info');
  }
}
