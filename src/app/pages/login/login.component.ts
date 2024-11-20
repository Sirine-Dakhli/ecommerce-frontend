import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../services/user.service';
import { CartService } from '../../services/cart.service';
import { Produit } from '../../models/produit.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  isLoading: boolean = false;

  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private router: Router,
    private http: HttpClient,
    private userService: UserService,
    private cartService: CartService
  ) {}

  onSubmit(): void {
    this.isLoading = true;
    this.errorMessage = null;

    const payload = {
      compte: {
        email: this.email,
        password: this.password,
      },
    };

    this.http.post('http://localhost:8082/api/internaute/connecter', payload).subscribe({
      next: (response: any) => {
        console.log('Réponse de l\'API:', response);

        // Stocker l'utilisateur
        if (response?.client) {
          this.userService.setUserData(response.client);
        }

        // Fusionner le panier local et le panier récupéré
        if (response?.produitPaniers) {
          const panierLocal = this.cartService.getCartData();
          const panierServeur: Produit[] = response.produitPaniers.map((item: any) => ({
            id: item.id,
            nom: item.nom_produit,
            prix: item.prix || 0,
            quantite: item.quantite,
            description: item.description || '',
          }));

          //const panierFusionne = this.fusionnerPaniers(panierLocal, panierServeur);

          // Mettre à jour le panier
          this.cartService.setCartData(panierServeur);
        }

        // Afficher le succès et rediriger
        this.successMessage = 'Connexion réussie !';
        this.isLoading = false;

        setTimeout(() => {
          this.router.navigate(['/produits']);
        }, 2000);
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Erreur de connexion.';
        this.isLoading = false;
      },
    });
  }


  private fusionnerPaniers(panierLocal: Produit[], panierServeur: Produit[]): Produit[] {
    const panierFusionne = [...panierLocal];

    panierServeur.forEach((produitServeur) => {
      if (!produitServeur.id || !produitServeur.nom || produitServeur.prix <= 0) {
        console.warn('Produit invalide ignoré :', produitServeur);
        return;
      }

      const produitLocal = panierLocal.find((p) => p.id === produitServeur.id);

      if (produitLocal) {
        produitLocal.quantite = (produitLocal.quantite || 0) + (produitServeur.quantite || 0);
      } else {
        panierFusionne.push(produitServeur);
      }
    });

    return panierFusionne;
  }

}
