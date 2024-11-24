import { Component, OnInit } from '@angular/core';
import { CategorieService } from '../../services/categorie.service';
import { Categorie } from '../../models/categorie.model';

@Component({
  selector: 'app-gestion-categorie',
  templateUrl: './gestion-categorie.component.html',
  styleUrls: ['./gestion-categorie.component.css'],
})
export class GestionCategorieComponent implements OnInit {
  categories: Categorie[] = [];
  categorie: Categorie = { id: 0, nom: '', description: '' };
  isLoading = true;
  error: string | null = null;

  constructor(private categorieService: CategorieService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  // Charger toutes les catégories
  loadCategories(): void {
    this.isLoading = true;
    this.categorieService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = err.message;
        this.isLoading = false;
      },
    });
  }

  // Ajouter ou modifier une catégorie
  onSubmit(): void {
    if (this.categorie.id) {
      // Modifier la catégorie
      this.categorieService.updateCategorie(this.categorie.id, this.categorie).subscribe(() => {
        this.loadCategories();
        this.resetForm();
      });
    } else {
      // Ajouter une nouvelle catégorie
      this.categorieService.addCategorie(this.categorie).subscribe(() => {
        this.loadCategories();
        this.resetForm();
      });
    }
  }

  // Préparer les données pour modifier une catégorie
  editCategorie(cat: Categorie): void {
    this.categorie = { ...cat };
  }

  // Supprimer une catégorie
  deleteCategorie(id: number): void {
    this.categorieService.deleteCategorie(id).subscribe(() => this.loadCategories());
  }

  // Réinitialiser le formulaire
  resetForm(): void {
    this.categorie = { id: 0, nom: '', description: '' };
  }
}
