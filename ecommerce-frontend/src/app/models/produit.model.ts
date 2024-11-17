import { Categorie } from './categorie.model';

export class Produit {
  id?: number; 
  nom: string;
  description: string;
  prix: number;
  categorie?: Categorie;
  imageUrl?: string;

  constructor(
    nom: string = '',
    description: string = '',
    prix: number = 0,
    categorie?: Categorie,
    imageUrl: string = ''
  ) {
    this.nom = nom;
    this.description = description;
    this.prix = prix;
    this.categorie = categorie;
    this.imageUrl = imageUrl;
  }
}
