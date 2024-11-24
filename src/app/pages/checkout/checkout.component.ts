import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { UserService } from '../../services/user.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Produit } from '../../models/produit.model';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  produitsPanier: Produit[] = [];
  user: any = null;
  numeroCarte: string = '';
  dateExp: string = '';
  codeCC: string = '';
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(
    private cartService: CartService,
    private userService: UserService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Charger l'utilisateur
    this.user = this.userService.getUserData();
    if (!this.user) {
      this.router.navigate(['/login']);
      return;
    }

    // Charger les produits dans le panier
    this.produitsPanier = this.cartService.getCartData();
    if (this.produitsPanier.length === 0) {
      this.errorMessage = 'Votre panier est vide.';
    }
  }

  confirmerCommande(): void {
    // Validation des champs
    if (!this.numeroCarte.trim() || !this.dateExp.trim() || !this.codeCC.trim()) {
      this.errorMessage = 'Veuillez remplir toutes les informations.';
      return;
    }

    if (this.produitsPanier.length === 0) {
      this.errorMessage = 'Votre panier est vide.';
      return;
    }

    // Générer les données de la commande
    const commandeData = {
      commande: {
        numero_carte: this.numeroCarte,
        date_exp: this.dateExp,
        cc: this.codeCC,
      },
      panier: {
        id: this.user?.id || null,
        produitPanier: this.produitsPanier.map((produit) => ({
          quantite: produit.quantite,
          produit: { id: produit.id },
        })),
      },
    };

    console.log('Données envoyées au backend :', commandeData);

    // Envoyer la commande au backend
    this.http.post('http://localhost:8082/api/client/achat', commandeData).subscribe({
      next: (response: any) => {
        console.log('Réponse du backend :', response);
        this.successMessage = 'Votre commande a été confirmée avec succès !';
        this.errorMessage = null;

        // Vider le panier
        this.cartService.clearCart();
        this.produitsPanier = [];

        // Réinitialiser les champs
        this.numeroCarte = '';
        this.dateExp = '';
        this.codeCC = '';

        // Redirection après succès
        setTimeout(() => this.router.navigate(['/']), 3000);
      },
      error: (err) => {
        console.error('Erreur lors de la commande :', err);
        this.successMessage = null;
        this.errorMessage =
          err.error?.message || 'Une erreur est survenue. Veuillez réessayer.';
      },
    });
  }
}
