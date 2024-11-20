import { Component, OnInit } from '@angular/core';
import { ProduitService } from '../../services/produit.service';
import { CategorieService } from '../../services/categorie.service';
import { CartService } from '../../services/cart.service';
import { UserService } from '../../services/user.service';
import { Produit } from '../../models/produit.model';
import { Categorie } from '../../models/categorie.model';

@Component({
  selector: 'app-visualiser-produits',
  templateUrl: './visualiser-produits.component.html',
  styleUrls: ['./visualiser-produits.component.css'],
})
export class VisualiserProduitsComponent implements OnInit {
  produits: Produit[] = []; // Liste complète des produits
  produitsFiltres: Produit[] = []; // Produits après application des filtres
  produitsFiltresParCategorie: { [key: string]: Produit[] } = {}; // Produits organisés par catégorie
  categories: Categorie[] = []; // Liste des catégories
  produitsPanier: Produit[] = []; // Produits dans le panier
  searchTerm: string = ''; // Terme de recherche
  quantitePanier: number = 0; // Quantité totale dans le panier
  userName: string | null = null; // Nom de l'utilisateur connecté
  isLoading: boolean = true; // Indicateur de chargement
  error: string | null = null; // Gestion des erreurs

  constructor(
    private produitService: ProduitService,
    private categorieService: CategorieService,
    private cartService: CartService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    // Charger les produits et catégories
    this.loadProduits();
    this.loadCategories();

    // Charger les produits du panier
    this.produitsPanier = this.cartService.getCartData();
    this.quantitePanier = this.cartService.getCartQuantity();

    // Récupérer les informations utilisateur
    const user = this.userService.getUserData();
    if (user) {
      this.userName = `${user.prenom} ${user.nom}`;
    } else {
      console.warn('Aucun utilisateur connecté.');
    }
  }

  // Charger tous les produits
  loadProduits(): void {
    this.produitService.getProduits().subscribe({
      next: (data: Produit[]) => {
        this.produits = data;
        this.produitsFiltres = data;
        this.organiserProduitsParCategorie();
        this.isLoading = false;
      },
      error: (err: any) => {
        this.error = err.message;
        this.isLoading = false;
      },
    });
  }

  // Charger toutes les catégories
  loadCategories(): void {
    this.categorieService.getCategories().subscribe({
      next: (data: Categorie[]) => {
        this.categories = data;
        console.log('Catégories chargées :', this.categories);
      },
      error: (err: any) => {
        this.error = err.message;
      },
    });
  }

  // Organiser les produits par catégorie
  organiserProduitsParCategorie(): void {
    this.produitsFiltresParCategorie = {};
    this.produitsFiltres.forEach((produit) => {
      const categorieNom = produit.categorie?.nom || 'Sans catégorie';
      if (!this.produitsFiltresParCategorie[categorieNom]) {
        this.produitsFiltresParCategorie[categorieNom] = [];
      }
      this.produitsFiltresParCategorie[categorieNom].push(produit);
    });
  }

  // Obtenir les clés des catégories
  getCategorieKeys(): string[] {
    return Object.keys(this.produitsFiltresParCategorie);
  }

  // Filtrer les produits par catégorie
  filtrerParCategorie(categorieId: number): void {
    this.produitsFiltres = this.produits.filter(
      (produit) => produit.categorie?.id === categorieId
    );
    this.organiserProduitsParCategorie();
  }

  // Réinitialiser le filtre
  supprimerFiltre(): void {
    this.produitsFiltres = this.produits;
    this.organiserProduitsParCategorie();
  }

  // Filtrer les produits localement par terme de recherche
  filtrerProduitsLocaux(): void {
    const terme = this.searchTerm.toLowerCase().trim();
    this.produitsFiltres = this.produits.filter((produit) =>
      produit.nom.toLowerCase().includes(terme)
    );
    this.organiserProduitsParCategorie();
  }

  // Ajouter un produit au panier
  ajouterAuPanier(produit: Produit): void {
    this.cartService.ajouterAuPanier(produit);
    this.produitsPanier = this.cartService.getCartData();
    this.quantitePanier = this.cartService.getCartQuantity();
  }

  // Supprimer un produit du panier
  supprimerDuPanier(id: number): void {
    this.cartService.supprimerDuPanier(id);
    this.produitsPanier = this.cartService.getCartData();
    this.quantitePanier = this.cartService.getCartQuantity();
  }
}
