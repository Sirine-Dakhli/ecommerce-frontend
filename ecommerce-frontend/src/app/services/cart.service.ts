import { Injectable } from '@angular/core';
import { Produit } from '../models/produit.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private produitsPanier: Produit[] = []; // Liste des produits dans le panier

  // Récupérer tous les produits dans le panier
  getCartData(): Produit[] {
    return this.produitsPanier;
  }

  // Définir les produits du panier
  setCartData(produits: Produit[]): void {
    this.produitsPanier = produits
      .filter((item) => item.id && item.nom && item.prix > 0) // Filtre les produits valides
      .map((item) => ({
        id: item.id,
        nom: item.nom,
        prix: item.prix,
        description: item.description || 'Description non disponible',
        quantite: item.quantite || 1,
        categorie: item.categorie || null,
      }));
    console.log('Panier mis à jour:', this.produitsPanier);
  }


  // Ajouter un produit au panier
  ajouterAuPanier(produit: Produit): void {
    const produitExistant = this.produitsPanier.find((p) => p.id === produit.id);

    if (produitExistant) {
      produitExistant.quantite = (produitExistant.quantite || 1) + 1;
    } else {
      this.produitsPanier.push({ ...produit, quantite: 1 });
    }
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
  getCartQuantity(): number {
    return this.produitsPanier.reduce((total, produit) => total + (produit.quantite || 0), 0);
  }
}
