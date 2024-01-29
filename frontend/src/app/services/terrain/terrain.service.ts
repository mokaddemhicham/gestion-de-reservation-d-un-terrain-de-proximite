import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Terrain} from "../../models/terrain";
import {Observable} from "rxjs";
import {TerrainDto} from "../../models/terrainDto";
import {ProprietaireTerrain} from "../../models/proprietaire-terrain";
import {Service} from "../../models/service";

@Injectable({
  providedIn: 'root'
})
export class TerrainService {
  private apiUrl: String = "http://localhost:8080/api/v1/terrains";
  constructor(private http: HttpClient) { }

  public addTerrain(terrain: TerrainDto, image: File): Observable<boolean>{
    const formData : FormData = new FormData();
    formData.append("terrain", new Blob([JSON.stringify(terrain)], {type: 'application/json'}))
    formData.append("image", image)
    return this.http.post<boolean>(`${this.apiUrl}/add`, formData);
  }

  public updateTerrain(terrain: TerrainDto, image: File | ""): Observable<Terrain>{
    const formData : FormData = new FormData();
    formData.append("terrain", new Blob([JSON.stringify(terrain)], {type: 'application/json'}))
    formData.append("image", image)
    return this.http.put<Terrain>(`${this.apiUrl}/update/${terrain.uuid}`, formData);
  }

  public deleteTerrain(uuid : string):Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/delete/${uuid}`);
  }

  public getTerrains(): Observable<Terrain[]>{
    return this.http.get<Terrain[]>(`${this.apiUrl}`);
  }

  public getTerrain(uuid: string): Observable<Terrain>{
    return this.http.get<Terrain>(`${this.apiUrl}/${uuid}`);
  }


  getServices(uuid: string):Observable<Service[]> {
    return this.http.get<Service[]>(`${this.apiUrl}/${uuid}/services`)
  }

  addService(uuid: string, service: Service): Observable<Service> {
    console.log(uuid, service)
    return this.http.post<Service>(`${this.apiUrl}/${uuid}/services/add`, service);
  }
  getTerrainCount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/terrainCount`);
  }
  deleteService(uuid: string) {

  }
}
