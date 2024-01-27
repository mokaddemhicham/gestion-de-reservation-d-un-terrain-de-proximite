// src/app/client.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import {ProprietaireTerrain} from "../../models/proprietaire-terrain";

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private apiUrl = 'http://localhost:8080/clients'; // Update with your Spring Boot backend URL proprietaire-terrains
  private apiUrl2 = 'http://localhost:8080/proprietaire-terrains'; // Update with your Spring Boot backend URL

  constructor(private http: HttpClient) {}
  getAll(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}`);
  }
  saveClient(client: User): Observable<User> {

    return this.http.post<User>(`${this.apiUrl}/save`, client);
  }
  saveOwner(client: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl2}/save`, client);
  }

  getClientById(clientId: string | undefined): Observable<User> {
    const url = `${this.apiUrl}/${clientId}`;
    return this.http.get<User>(url);
  }

  updateClient(clientId: string | undefined, clientToUpdate: User | undefined) {
    const url = `${this.apiUrl}/update`;
    return this.http.put(url, clientToUpdate);
  }

  deleteClient(uuid: string | undefined) {
    const url = `${this.apiUrl}/delete/${uuid}`;
    return this.http.delete(url);
  }

}
