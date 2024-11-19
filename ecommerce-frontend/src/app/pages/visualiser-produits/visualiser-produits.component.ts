import { Component, OnInit } from '@angular/core';
import { ProduitService } from '../../services/produit.service';
import { CategorieService } from '../../services/categorie.service';
import { Produit } from '../../models/produit.model';
import { Categorie } from '../../models/categorie.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-visualiser-produits',
  templateUrl: './visualiser-produits.component.html',
  styleUrls: ['./visualiser-produits.component.css'],
})
export class VisualiserProduitsComponent implements OnInit {
  produits: Produit[] = [];
  produitsFiltres: Produit[] = [];
  produitsPanier: Produit[] = []; // Liste des produits dans le panier
  categories: Categorie[] = [];
  isLoading = true;
  error: string | null = null;
  searchTerm: string = '';
  categorieSelectionnee: number | null = null;
  quantitePanier: number = 0;

  constructor(
    private produitService: ProduitService,
    private categorieService: CategorieService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadProduits();
    this.produitsPanier = this.cartService.obtenirProduitsPanier(); // Récupère les produits du panier
    this.quantitePanier = this.cartService.obtenirQuantiteTotale(); // Mise à jour du compteur
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
    this.cartService.ajouterAuPanier(produit);
    this.quantitePanier = this.cartService.obtenirQuantiteTotale(); // Mise à jour du compteur
    this.produitsPanier = this.cartService.obtenirProduitsPanier(); // Mettre à jour les produits affichés dans le panier
    console.log('Produit ajouté au panier:', produit);
  }

  // Modifier la quantité d'un produit dans le panier
  modifierQuantite(produit: Produit): void {
    if (produit.quantite !== undefined) {
      this.cartService.modifierQuantite(produit.id!, produit.quantite);
      this.produitsPanier = this.cartService.obtenirProduitsPanier(); // Mettre à jour l'affichage
    }
  }

  // Supprimer un produit du panier
  supprimerDuPanier(id: number): void {
    this.cartService.supprimerDuPanier(id);
    this.produitsPanier = this.cartService.obtenirProduitsPanier(); // Mettre à jour l'affichage
  }
}
