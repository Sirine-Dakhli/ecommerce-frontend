import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommandeService {
  private apiCommandeUrl = 'http://localhost:8082/api/client/achat';

  constructor(private http: HttpClient) {}

  // Méthode pour envoyer les données de la commande
  confirmerCommande(payload: any): Observable<any> {
    return this.http.post<any>(this.apiCommandeUrl, payload);
  }
}
