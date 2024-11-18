import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produit } from '../models/produit.model';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {
  private apiProduitsUrl = 'http://localhost:8082/api/admin/catalogue/produits';
  private apiProduitUrl = 'http://localhost:8082/api/admin/catalogue/produit';

  constructor(private http: HttpClient) {}

  
  getProduits(): Observable<Produit[]> {
    return this.http.get<Produit[]>(this.apiProduitsUrl);
  }


  addProduit(payload: { produit: Partial<Produit>; id_categorie: number }): Observable<Produit> {
    return this.http.post<Produit>(this.apiProduitUrl, payload);
  }

  updateProduit(id: number, payload: { produit: Partial<Produit>; id_categorie?: number }): Observable<Produit> {
    return this.http.put<Produit>(`${this.apiProduitUrl}/${id}`, payload);
  }



  deleteProduit(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiProduitUrl}/${id}`);
  }
}
