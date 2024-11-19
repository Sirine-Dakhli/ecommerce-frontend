import { Injectable } from '@angular/core';
import { Produit } from '../models/produit.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  produitsPanier: Produit[] = []; // Liste des produits ajoutés au panier

  // Ajouter un produit au panier
  ajouterAuPanier(produit: Produit): void {
    const produitExistant = this.produitsPanier.find((p) => p.id === produit.id);

    if (produitExistant) {
      produitExistant.quantite = (produitExistant.quantite || 1) + 1;
    } else {
      this.produitsPanier.push({ ...produit, quantite: 1 });
    }
  }

  // Récupérer tous les produits du panier
  obtenirProduitsPanier(): Produit[] {
    return this.produitsPanier;
  }

  // Modifier la quantité d'un produit
  modifierQuantite(id: number, quantite: number): void {
    const produit = this.produitsPanier.find((p) => p.id === id);
    if (produit) {
      produit.quantite = quantite;
    }
  }

  // Supprimer un produit du panier
  supprimerDuPanier(id: number): void {
    this.produitsPanier = this.produitsPanier.filter((p) => p.id !== id);
  }

  // Obtenir la quantité totale des produits dans le panier
  obtenirQuantiteTotale(): number {
    return this.produitsPanier.reduce((total, produit) => total + (produit.quantite || 0), 0);
  }
}
