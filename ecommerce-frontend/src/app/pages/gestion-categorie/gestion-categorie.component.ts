import { Component, OnInit } from '@angular/core';
import { ProduitService } from '../../services/produit.service';
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

  constructor(private produitService: ProduitService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  // Charger la liste des catégories
  loadCategories(): void {
    this.isLoading = true;
    this.produitService.getCategories().subscribe({
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
      this.produitService
        .updateCategorie(this.categorie.id, this.categorie)
        .subscribe(() => this.loadCategories());
    } else {
      // Ajouter une nouvelle catégorie
      this.produitService.addCategorie(this.categorie).subscribe(() => {
        this.loadCategories();
        this.categorie = { id: 0, nom: '', description: '' };
      });
    }
  }

  // Préparer les données pour modifier une catégorie
  editCategorie(cat: Categorie): void {
    this.categorie = { ...cat };
  }

  // Supprimer une catégorie
  deleteCategorie(id: number): void {
    this.produitService.deleteCategorie(id).subscribe(() => this.loadCategories());
  }
}
