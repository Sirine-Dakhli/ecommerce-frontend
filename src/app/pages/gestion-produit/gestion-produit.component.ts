import { Component, OnInit } from '@angular/core';
import { ProduitService } from '../../services/produit.service';
import { CategorieService } from '../../services/categorie.service';
import { Produit } from '../../models/produit.model';
import { Categorie } from '../../models/categorie.model';

@Component({
  selector: 'app-gestion-produit',
  templateUrl: './gestion-produit.component.html',
  styleUrls: ['./gestion-produit.component.css'],
})
export class GestionProduitComponent implements OnInit {
  produits: Produit[] = [];
  categories: Categorie[] = [];
  produit: Produit = new Produit();
  selectedCategorieId: number | null = null;
  isLoading = false;
  error: string | null = null;

  constructor(
    private produitService: ProduitService,
    private categorieService: CategorieService
  ) {}

  ngOnInit(): void {
    this.fetchCategories();
  }

  // Charger toutes les catégories
  fetchCategories(): void {
    this.isLoading = true;
    this.categorieService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
        console.log('Catégories récupérées :', this.categories);

        this.fetchProduits();
      },
      error: (err) => {
        this.error = 'Erreur lors de la récupération des catégories.';
        console.error(err);
        this.isLoading = false;
      },
    });
  }

  // Charger tous les produits
  fetchProduits(): void {
    this.isLoading = true;
    this.produitService.getProduits().subscribe({
      next: (data) => {
        console.log('Produits récupérés depuis l\'API :', data);

        this.produits = data.map((produit) => {

          const categorieAssociee = produit.categorie || { id: 0, nom: 'Non spécifiée', description: '' };

          console.log('Produit traité :', produit);
          console.log('Catégorie associée :', categorieAssociee);

          return {
            ...produit,
            categorie: categorieAssociee,
          };
        });

        console.log('Produits avec catégories associées :', this.produits);
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Erreur lors de la récupération des produits.';
        console.error(err);
        this.isLoading = false;
      },
    });
  }



  // Ajouter ou modifier un produit
  onSubmit(): void {
    if (!this.selectedCategorieId) {
      alert('Veuillez sélectionner une catégorie.');
      return;
    }

    const payload = {
      produit: {
        nom: this.produit.nom,
        description: this.produit.description,
        prix: this.produit.prix,
      },
      id_categorie: this.selectedCategorieId,
    };

    console.log('Payload envoyé :', payload);

    if (this.produit.id) {
      this.produitService.updateProduit(this.produit.id, payload).subscribe({
        next: () => {
          this.fetchProduits();
          this.resetForm();
        },
        error: (err) => console.error('Erreur lors de la mise à jour du produit.', err),
      });
    } else {
      this.produitService.addProduit(payload).subscribe({
        next: () => {
          this.fetchProduits();
          this.resetForm();
        },
        error: (err) => console.error("Erreur lors de l'ajout du produit.", err),
      });
    }
  }


  editProduit(produit: Produit): void {
    this.produit = { ...produit };
    this.selectedCategorieId = produit.categorie?.id || null;
  }

  // Supprimer un produit
  deleteProduit(id: number | undefined): void {
    if (id) {
      this.produitService.deleteProduit(id).subscribe({
        next: () => this.fetchProduits(),
        error: (err) => {
          this.error = 'Erreur lors de la suppression du produit.';
          console.error(err);
        },
      });
    }
  }

  // Réinitialiser le formulaire
  resetForm(): void {
    this.produit = new Produit();
    this.selectedCategorieId = null;
  }
}
