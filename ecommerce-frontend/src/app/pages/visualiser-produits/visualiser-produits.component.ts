import { Component, OnInit } from '@angular/core';
import { ProduitService } from '../../services/produit.service';
import { CartService } from '../../services/cart.service';
import { UserService } from '../../services/user.service';
import { Produit } from '../../models/produit.model';

@Component({
  selector: 'app-visualiser-produits',
  templateUrl: './visualiser-produits.component.html',
  styleUrls: ['./visualiser-produits.component.css'],
})
export class VisualiserProduitsComponent implements OnInit {
  produits: Produit[] = []; // Liste des produits
  produitsFiltres: Produit[] = []; // Produits après filtrage
  produitsPanier: any[] = []; // Produits dans le panier
  isLoading: boolean = true; // Indicateur de chargement
  error: string | null = null; // Gestion des erreurs
  searchTerm: string = ''; // Terme de recherche
  quantitePanier: number = 0; // Quantité totale dans le panier
  userName: string | null = null; // Nom de l'utilisateur connecté

  constructor(
    private produitService: ProduitService,
    private cartService: CartService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    // Charger les produits
    this.loadProduits();

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

  loadProduits(): void {
    this.produitService.getProduits().subscribe({
      next: (data: Produit[]) => {
        this.produits = data;
        this.produitsFiltres = data;
        this.isLoading = false;
      },
      error: (err: any) => {
        this.error = err.message;
        this.isLoading = false;
      },
    });
  }

  filtrerProduitsLocaux(): void {
    const terme = this.searchTerm.toLowerCase().trim();
    this.produitsFiltres = this.produits.filter((produit) =>
      produit.nom.toLowerCase().includes(terme)
    );
  }

  ajouterAuPanier(produit: Produit): void {
    this.cartService.ajouterAuPanier(produit);
    this.produitsPanier = this.cartService.getCartData();
    this.quantitePanier = this.cartService.getCartQuantity();
  }

  supprimerDuPanier(id: number): void {
    this.cartService.supprimerDuPanier(id);
    this.produitsPanier = this.cartService.getCartData();
    this.quantitePanier = this.cartService.getCartQuantity();
  }
}
