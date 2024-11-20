import { Injectable } from '@angular/core';
import { Produit } from '../models/produit.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private produitsPanier: Produit[] = []; // Liste des produits dans le panier

  // Récupérer tous les produits dans le panier
  getCartData(): Produit[] {
    this.produitsPanier = JSON.parse(localStorage.getItem('cart') || '[]');
    console.log('Panier récupéré depuis localStorage :', this.produitsPanier);
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
    console.log('Produit cliqué :', produit);

    const produitExistant = this.produitsPanier.find((p) => p.id === produit.id);

    if (produitExistant) {
      produitExistant.quantite = (produitExistant.quantite || 1) + 1;
      console.log('Produit déjà existant dans le panier, quantité mise à jour :', produitExistant);
    } else {
      this.produitsPanier.push({ ...produit, quantite: 1 });
      console.log('Produit ajouté au panier :', produit);
    }

    // Sauvegarder le panier dans localStorage
    localStorage.setItem('cart', JSON.stringify(this.produitsPanier));
    console.log('État actuel du panier (sauvegardé) :', this.produitsPanier);
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

  // Vider le panier
  clearCart(): void {
    this.produitsPanier = [];
    console.log('Le panier a été vidé.');
  }

  // Obtenir la quantité totale des produits dans le panier
  getCartQuantity(): number {
    return this.produitsPanier.reduce((total, produit) => total + (produit.quantite || 0), 0);
  }


}
