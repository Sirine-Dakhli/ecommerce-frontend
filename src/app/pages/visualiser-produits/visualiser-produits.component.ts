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
  produits: Produit[] = [];
  produitsFiltres: Produit[] = [];
  produitsFiltresParCategorie: { [key: string]: Produit[] } = {};
  categories: Categorie[] = [];
  searchTerm: string = '';
  quantitePanier: number = 0;
  userName: string | null = null;
  isLoading: boolean = true;
  error: string | null = null;

  constructor(
    private produitService: ProduitService,
    private categorieService: CategorieService,
    private cartService: CartService,
    private userService: UserService
  ) {}
  ngOnInit(): void {
    this.loadProduits();
    this.loadCategories();
    this.quantitePanier = this.cartService.getCartQuantity(); // Initialisation du compteur
    const user = this.userService.getUserData();
    if (user) {
      this.userName = `${user.prenom} ${user.nom}`;
    }
  }


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

  loadCategories(): void {
    this.categorieService.getCategories().subscribe({
      next: (data: Categorie[]) => {
        this.categories = data;
      },
      error: (err: any) => {
        this.error = err.message;
      },
    });
  }

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

  getCategorieKeys(): string[] {
    return Object.keys(this.produitsFiltresParCategorie);
  }

  filtrerParCategorie(categorieId: number): void {
    this.produitsFiltres = this.produits.filter(
      (produit) => produit.categorie?.id === categorieId
    );
    this.organiserProduitsParCategorie();
  }

  supprimerFiltre(): void {
    this.produitsFiltres = this.produits;
    this.organiserProduitsParCategorie();
  }

  filtrerProduitsLocaux(): void {
    const terme = this.searchTerm.toLowerCase().trim();
    this.produitsFiltres = this.produits.filter((produit) =>
      produit.nom.toLowerCase().includes(terme)
    );
    this.organiserProduitsParCategorie();
  }

  ajouterAuPanier(produit: Produit): void {
    console.log('Bouton Ajouter cliqué pour le produit :', produit); // Log du produit
    this.cartService.ajouterAuPanier(produit);
    this.quantitePanier = this.cartService.getCartQuantity(); // Met à jour le compteur après l'ajout
  }


}
