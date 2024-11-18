import { Component, OnInit } from '@angular/core';
import { ProduitService } from '../../services/produit.service';
import { CategorieService } from '../../services/categorie.service';
import { Produit } from '../../models/produit.model';
import { Categorie } from '../../models/categorie.model';

@Component({
  selector: 'app-visualiser-produits',
  templateUrl: './visualiser-produits.component.html',
  styleUrls: ['./visualiser-produits.component.css'],
})
export class VisualiserProduitsComponent implements OnInit {
  produits: Produit[] = [];
  produitsFiltres: Produit[] = [];
  categories: Categorie[] = [];
  isLoading = true;
  error: string | null = null;
  searchTerm: string = '';
  categorieSelectionnee: number | null = null;

  constructor(
    private produitService: ProduitService,
    private categorieService: CategorieService
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadProduits();
  }

  // Charger tous les produits
  loadProduits(): void {
    this.produitService.getProduits().subscribe({
      next: (data) => {
        this.produits = data;
        this.produitsFiltres = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = err.message;
        this.isLoading = false;
      },
    });
  }


  loadCategories(): void {
    this.categorieService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => {
        this.error = err.message;
      },
    });
  }

  // Filtrer par catégorie
  filtrerParCategorie(categorieId: number): void {
    this.categorieSelectionnee = categorieId;
    this.produitsFiltres = this.produits.filter(
      (produit) => produit.categorie?.id === categorieId
    );
  }

  // Réinitialiser le filtrage par catégorie
  reinitialiserFiltrage(): void {
    this.categorieSelectionnee = null;
    this.filtrerProduitsLocaux();
  }

  // Recherche locale par nom
  filtrerProduitsLocaux(): void {
    const terme = this.searchTerm.toLowerCase().trim();

    if (this.categorieSelectionnee) {
      this.produitsFiltres = this.produits.filter(
        (produit) =>
          produit.categorie?.id === this.categorieSelectionnee &&
          produit.nom.toLowerCase().includes(terme)
      );
    } else {
      this.produitsFiltres = this.produits.filter((produit) =>
        produit.nom.toLowerCase().includes(terme)
      );
    }
  }

  // Ajouter un produit au panier
  ajouterAuPanier(produit: Produit): void {
    console.log(`Produit ajouté au panier :`, produit);
  
  }
}
