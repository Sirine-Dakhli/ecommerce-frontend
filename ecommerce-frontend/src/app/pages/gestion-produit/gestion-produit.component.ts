import { Component, OnInit } from '@angular/core';
import { ProduitService } from '../../services/produit.service';
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
      },
      error: (err: any) => {
        this.error = err.message;
        this.isLoading = false;
      },
    });
  }

  getCategories(): void {
    this.produitService.getCategories().subscribe({
      next: (data: Categorie[]) => {
        this.categories = data;
      },
      error: (err: any) => {
        console.error('Erreur lors du chargement des catégories', err);
      },
    });
  }

  saveProduit(): void {
    if (this.produit.id === 0) {
      this.produitService.addProduit(this.produit).subscribe(() => {
        this.getProduits();
        this.produit = new Produit();
      });
    } else {
      this.produitService.updateProduit(this.produit.id, this.produit).subscribe(() => {
        this.getProduits();
        this.produit = new Produit();
      });
    }
  }

  editProduit(prod: Produit): void {
    this.produit = { ...prod }; // Copie les données du produit
  }

  deleteProduit(id: number): void {
    this.produitService.deleteProduit(id).subscribe(() => {
      this.getProduits();
    });
  }
}
