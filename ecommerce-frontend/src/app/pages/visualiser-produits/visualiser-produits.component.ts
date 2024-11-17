import { Component, OnInit } from '@angular/core';
import { ProduitService } from '../../services/produit.service';
import { Produit } from '../../models/produit.model';
import { Categorie } from '../../models/categorie.model';

@Component({
  selector: 'app-visualiser-produits',
  templateUrl: './visualiser-produits.component.html',
  styleUrls: ['./visualiser-produits.component.css']
})
export class VisualiserProduitsComponent implements OnInit {
  produits: Produit[] = [];
  categories: Categorie[] = [];
  isLoading = true;
  error: string | null = null;

  constructor(private produitService: ProduitService) {}

  ngOnInit(): void {
    this.getProduits();
    this.getCategories();
  }

  getProduits(): void {
    this.produitService.getProduits().subscribe({
      next: (data: Produit[]) => {
        this.produits = data;
        this.isLoading = false;
        this.error = null; // Réinitialise l'erreur si les données sont chargées avec succès
      },
      error: (err: any) => {
        this.error = 'Erreur lors du chargement des produits.';
        console.error('Erreur lors du chargement des produits:', err);
        this.isLoading = false;
      }
    });
  }

  getCategories(): void {
    this.produitService.getCategories().subscribe({
      next: (data: Categorie[]) => {
        this.categories = data;
      },
      error: (err: any) => {
        console.error('Erreur lors du chargement des catégories:', err);
      }
    });
  }

  ajouterAuPanier(produit: Produit): void {
    alert(`Le produit "${produit.nom}" a été ajouté au panier.`);
    console.log(`${produit.nom} ajouté au panier.`);
  }
}
