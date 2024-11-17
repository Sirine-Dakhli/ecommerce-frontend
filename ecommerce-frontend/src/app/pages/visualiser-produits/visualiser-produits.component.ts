import { Component, OnInit } from '@angular/core';
import { ProduitService } from '../../services/produit.service';
import { Produit } from '../../models/produit.model';

@Component({
  selector: 'app-visualiser-produits',
  templateUrl: './visualiser-produits.component.html',
  styleUrls: ['./visualiser-produits.component.css'],
})
export class VisualiserProduitsComponent implements OnInit {
  produits: Produit[] = []; // Propriété pour stocker les produits
  isLoading = true; // Indicateur de chargement
  error: string | null = null; // Propriété pour gérer les erreurs

  constructor(private produitService: ProduitService) {}

  ngOnInit(): void {
    this.loadProduits(); // Charger les produits au démarrage
  }

  // Charger les produits
  loadProduits(): void {
    this.produitService.getProduits().subscribe({
      next: (data: Produit[]) => {
        this.produits = data;
        this.isLoading = false;
      },
      error: (err: any) => {
        this.error = err.message;
        this.isLoading = false;
      },
    });
  }

  // Ajouter un produit au panier (fonctionnalité à implémenter plus tard)
  ajouterAuPanier(produit: Produit): void {
    console.log(`Produit ajouté au panier :`, produit);
    // Ajoutez ici la logique pour l'ajout au panier
  }
}
