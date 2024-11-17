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

  // Récupérer tous les produits
  getProduits(): Observable<Produit[]> {
    return this.http.get<Produit[]>(this.apiProduitsUrl);
  }

  // Ajouter un produit
  addProduit(produit: Produit, idCategorie: number): Observable<Produit> {
    return this.http.post<Produit>(this.apiProduitUrl, { produit, id_categorie: idCategorie });
  }

  // Mettre à jour un produit
  updateProduit(id: number, produit: Produit, idCategorie: number): Observable<Produit> {
    return this.http.put<Produit>(`${this.apiProduitUrl}/${id}`, { produit, id_categorie: idCategorie });
  }

  // Supprimer un produit
  deleteProduit(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiProduitUrl}/${id}`);
  }
}
