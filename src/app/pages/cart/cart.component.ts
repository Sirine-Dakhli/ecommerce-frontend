import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Produit } from '../../models/produit.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  produitsPanier: Produit[] = []; // Liste des produits dans le panier

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.produitsPanier = this.cartService.getCartData(); // Récupérer les produits du panier
  }

  // Modifier la quantité d'un produit
  modifierQuantite(produit: Produit): void {
    console.log('Quantité modifiée pour le produit :', produit); // Log modified product
    if (produit.quantite !== undefined) {
      this.cartService.modifierQuantite(produit.id!, produit.quantite);
      console.log('État actuel du panier après modification :', this.produitsPanier);
    }
  }

  supprimerDuPanier(id: number): void {
    console.log('Produit supprimé avec l\'ID :', id); // Log removed product
    this.cartService.supprimerDuPanier(id);
    this.produitsPanier = this.cartService.getCartData(); // Update local list
    console.log('État actuel du panier après suppression :', this.produitsPanier);
  }

}
