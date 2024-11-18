import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categorie } from '../models/categorie.model';

@Injectable({
  providedIn: 'root',
})
export class CategorieService {
  private apiCategoriesUrl = 'http://localhost:8082/api/admin/catalogue/categories';
  private apiCategorieUrl = 'http://localhost:8082/api/admin/catalogue/categorie'; // POST

  constructor(private http: HttpClient) {}

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
