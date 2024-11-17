import { Component, OnInit } from '@angular/core';
import { ProduitService } from '../../services/produit.service';
import { CategorieService } from '../../services/categorie.service';
import { Produit } from '../../models/produit.model';
import { Categorie } from '../../models/categorie.model';

@Component({
  selector: 'app-gestion-produit',
  templateUrl: './gestion-produit.component.html',
  styleUrls: ['./gestion-produit.component.css']
})
export class GestionProduitComponent implements OnInit {
  produits: Produit[] = [];
  categories: Categorie[] = [];
  produit: Produit = { nom: '', description: '', prix: 0 };
  selectedCategorieId: number | null = null;
  isLoading = false;

  constructor(
    private produitService: ProduitService,
    private categorieService: CategorieService
  ) {}

  ngOnInit(): void {
    this.fetchProduits();
    this.fetchCategories();
  }

  fetchProduits(): void {
    this.isLoading = true;
    this.produitService.getProduits().subscribe((data) => {
      this.produits = data;
      this.isLoading = false;
    });
  }

  fetchCategories(): void {
    this.categorieService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  onSubmit(): void {
    if (this.produit.id) {
      this.produitService
        .updateProduit(this.produit.id, this.produit, this.selectedCategorieId!)
        .subscribe(() => this.fetchProduits());
    } else {
      this.produitService
        .addProduit(this.produit, this.selectedCategorieId!)
        .subscribe(() => this.fetchProduits());
    }
    this.resetForm();
  }

  editProduit(produit: Produit): void {
    this.produit = { ...produit };
    this.selectedCategorieId = produit.categorie?.id || null;
  }

  deleteProduit(id: number | undefined): void {
    if (id) {
      this.produitService.deleteProduit(id).subscribe(() => this.fetchProduits());
    }
  }

  resetForm(): void {
    this.produit = { nom: '', description: '', prix: 0 };
    this.selectedCategorieId = null;
  }
}
