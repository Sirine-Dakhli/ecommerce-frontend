import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private apiInternauteUrl = 'http://localhost:8082/api/internaute'; // URL backend

  constructor(private http: HttpClient) {}

  /**
   * Connexion de l'utilisateur
   */
  login(payload: any): Observable<any> {
    return this.http.post(`${this.apiInternauteUrl}/connecter`, payload);
  }

  /**
   * Inscription d'un nouveau client
   */
  inscrireClient(payload: any): Observable<any> {
    return this.http.post(`${this.apiInternauteUrl}/inscription-client`, payload);
  }

  /**
   * Récupérer les informations d'un client par ID
   */
  getClient(id: string): Observable<any> {
    return this.http.get(`${this.apiInternauteUrl}/${id}`);
  }

  /**
   * Mettre à jour les informations d'un client
   */
  updateClient(id: string, payload: any): Observable<any> {
    return this.http.put(`${this.apiInternauteUrl}/${id}`, payload);
  }
}
