import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produit } from '../models/produit.model';
import { Categorie } from '../models/categorie.model';

@Injectable({
  providedIn: 'root',
})
export class ProduitService {
  private apiProduitsUrl = 'http://localhost:8082/api/produits';
  private apiCategoriesUrl = 'http://localhost:8082/api/admin/catalogue/categories';
  private apiCategorieUrl = 'http://localhost:8082/api/admin/catalogue/categorie';

  constructor(private http: HttpClient) {}

  // Récupérer tous les produits
  getProduits(): Observable<Produit[]> {
    return this.http.get<Produit[]>(this.apiProduitsUrl);
  }

  // Ajouter un produit
  addProduit(produit: Produit): Observable<Produit> {
    return this.http.post<Produit>(this.apiProduitsUrl, produit);
  }

  // Mettre à jour un produit
  updateProduit(id: number, produit: Produit): Observable<Produit> {
    return this.http.put<Produit>(`${this.apiProduitsUrl}/${id}`, produit);
  }

  // Supprimer un produit
  deleteProduit(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiProduitsUrl}/${id}`);
  }

  // Récupérer toutes les catégories
  getCategories(): Observable<Categorie[]> {
    return this.http.get<Categorie[]>(this.apiCategoriesUrl);
  }

  addCategorie(categorie: Categorie): Observable<Categorie> {
    return this.http.post<Categorie>(this.apiCategorieUrl, categorie);
  }


  updateCategorie(id: number, categorie: Categorie): Observable<Categorie> {
    return this.http.put<Categorie>(`${this.apiCategorieUrl}/${id}`, categorie);
  }

  deleteCategorie(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiCategorieUrl}/${id}`);
  }
}
