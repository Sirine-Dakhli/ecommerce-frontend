import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private apiInternauteUrl = 'http://localhost:8082/api/internaute'; // URL backend pour l'internaute
  private apiClientUrl = 'http://localhost:8082/api/client/gestion-compte'; // URL backend pour les clients

  constructor(private http: HttpClient) {}

  /**
   * Méthode pour connecter un utilisateur
   */
  login(payload: any): Observable<any> {
    return this.http.post(`${this.apiInternauteUrl}/connecter`, {
      compte: {
        email: payload.email,
        password: payload.password
      },
      panier: null
    });
  }

  /**
   * Méthode pour inscrire un nouveau client
   */
  inscrireClient(payload: any): Observable<any> {
    return this.http.post(`${this.apiInternauteUrl}/inscription-client`, payload);
  }

  /**
   * Méthode pour récupérer les informations d'un client par ID
   */
  getClient(id: string): Observable<any> {
    return this.http.get(`${this.apiClientUrl}/${id}`);
  }
  

  /**
   * Méthode pour mettre à jour les informations d'un client
   */
  updateClient(id: string, payload: any): Observable<any> {
    return this.http.put(`${this.apiClientUrl}/${id}`, payload);
  }
}
