import { Categorie } from './categorie.model';

export class Produit {
  id?: number;
  nom: string;
  description: string;
  prix: number;
  categorie?: Categorie | null; // Permettre null pour cette propriété
  id_categorie?: number; // ID de la catégorie pour l'API

  constructor(
    nom: string = '',
    description: string = '',
    prix: number = 0,
    categorie?: Categorie | null
  ) {
    this.nom = nom;
    this.description = description;
    this.prix = prix;
    this.categorie = categorie || null; // Initialisation par défaut à null
  }
}
