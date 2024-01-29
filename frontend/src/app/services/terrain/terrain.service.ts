import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Terrain} from "../../models/terrain";
import {Observable} from "rxjs";
import {TerrainDto} from "../../models/terrainDto";
import {ProprietaireTerrain} from "../../models/proprietaire-terrain";
import {Service} from "../../models/service";
import {Disponibilite} from "../../models/disponibilite";
import {PageableDto} from "../../models/pageableDto";
import {Reservation} from "../../models/reservation";
import {ReservationDto} from "../../models/reservationDto";
import {Paiement} from "../../models/paiement";

@Injectable({
  providedIn: 'root'
})
export class TerrainService {
  private apiUrl: string = "http://localhost:8080/api/v1/terrains";
  private apiUrl2: string = "http://localhost:8080/api/v1/reservations";
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

  public getAllTerrainsPageable(page: number, size: number): Observable<PageableDto<Terrain>>{
    return this.http.get<PageableDto<Terrain>>(`${this.apiUrl}/all?page=${page}&size=${size}`);
  }

  public getTerrain(uuid: string): Observable<Terrain>{
    return this.http.get<Terrain>(`${this.apiUrl}/${uuid}`);
  }


  getServices(uuid: string):Observable<Service[]> {
    return this.http.get<Service[]>(`${this.apiUrl}/${uuid}/services`)
  }

  getAllServices(uuid: string):Observable<Service[]> {
    return this.http.get<Service[]>(`${this.apiUrl}/${uuid}/services/all`)
  }

  addServices(uuid: string, services: Service[]): Observable<Service[]> {
    return this.http.post<Service[]>(`${this.apiUrl}/${uuid}/services/add`, services);
  }

  getTerrainCount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/terrainCount`);
  }

  deleteService(serviceUuid: string, terrainUuid: string) {
    return this.http.delete<void>(`${this.apiUrl}/${terrainUuid}/services/delete/${serviceUuid}`)
  }

  getDisponibilitesByTerrain(uuid: string): Observable<Disponibilite[]>{
    return this.http.get<Disponibilite[]>(`${this.apiUrl}/${uuid}/disponibilites`);
  }

  addDisponibilite(uuid : string, disponibilite: Disponibilite): Observable<Disponibilite>{
    return this.http.post<Disponibilite>(`${this.apiUrl}/${uuid}/disponibilites/add`, disponibilite)
  }

  editDisponibilite(uuid : string, disponibilite: Disponibilite): Observable<Disponibilite>{
    return this.http.put<Disponibilite>(`${this.apiUrl}/${uuid}/disponibilites/update`, disponibilite)
  }

  deleteDisponibilite(disponibiliteUuid: string, terrainUuid: string){
    return this.http.delete<void>(`${this.apiUrl}/${terrainUuid}/disponibilites/delete/${disponibiliteUuid}`)
  }

  public getHeuresAvailables(date: string, terrainId: string):Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/heures-available?date=${date}&terrainId=${terrainId}`)
  }
  public addReservation(reservation: ReservationDto):Observable<Reservation>{
    return this.http.post<Reservation>(`${this.apiUrl2}/add`, reservation);
  }

  public getReservation(uuid: string):Observable<Reservation>{
    return this.http.get<Reservation>(`${this.apiUrl2}/${uuid}`)
  }

  public updateReservation(uuid: string, paiement: Paiement):Observable<Reservation>{
    return this.http.put<Reservation>(`${this.apiUrl2}/update/${uuid}`, paiement);
  }
}
