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
    if (produit.quantite !== undefined) {
      this.cartService.modifierQuantite(produit.id!, produit.quantite);
    }
  }

  // Supprimer un produit du panier
  supprimerDuPanier(id: number): void {
    this.cartService.supprimerDuPanier(id);
    this.produitsPanier = this.cartService.getCartData(); // Mettre à jour la liste locale
  }
}
