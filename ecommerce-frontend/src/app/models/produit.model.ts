import { Categorie } from './categorie.model';

export class Produit {
  id?: number;
  nom: string;
  description: string;
  prix: number;
  categorie?: Categorie | null;
  quantite?: number; // Nouvelle propriété pour la gestion du panier

  constructor(
    nom: string = '',
    description: string = '',
    prix: number = 0,
    categorie?: Categorie | null,
    quantite: number = 1
  ) {
    this.nom = nom;
    this.description = description;
    this.prix = prix;
    this.categorie = categorie || null;
    this.quantite = quantite;
  }
}
