import { Component, OnInit } from '@angular/core';
import { PanierService } from '../../services/panier.service';
import { PanierProduit } from '../../models/Panier.model';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {
  panierProduits: PanierProduit[] = [];
  isLoading = true;

  constructor(private panierService: PanierService) {}

  ngOnInit(): void {
    this.chargerPanier();
  }

  chargerPanier(): void {
    this.panierService.getPanier(1).subscribe({
      next: (data) => {
        this.panierProduits = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement du panier', error);
        this.isLoading = false;
      }
    });
  }

  modifierQuantite(produitId: number, quantite: number): void {
    this.panierService.modifierProduit(produitId, quantite).subscribe(() => {
      this.chargerPanier();
    });
  }

  supprimerProduit(id: number): void {
    this.panierService.supprimerProduit(id).subscribe(() => {
      this.chargerPanier();
    });
  }
}
