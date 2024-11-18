import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PanierProduit } from '../models/Panier.model';

@Injectable({
    providedIn: 'root'
})
export class PanierService {
    private apiUrl = 'http://localhost:8082/api/panier';

    constructor(private http: HttpClient) {}

    getPanier(idClient: number): Observable<PanierProduit[]> {
        return this.http.get<PanierProduit[]>(`${this.apiUrl}/${idClient}`);
    }

    ajouterProduit(panierProduit: PanierProduit): Observable<any> {
        return this.http.post(this.apiUrl, panierProduit);
    }

    modifierProduit(id: number, quantite: number): Observable<any> {
        return this.http.put(`${this.apiUrl}/${id}`, { quantite });
    }

    supprimerProduit(id: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }
}
