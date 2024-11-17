import { Categorie } from './categorie.model';

export class Produit {
  id: number;
  nom: string;
  description: string;
  prix: number;
  id_categorie: number;
  categorie?: Categorie;
  imageUrl?: string;

  constructor(
    id: number = 0,
    nom: string = '',
    description: string = '',
    prix: number = 0,
    id_categorie: number = 0,
    categorie?: Categorie,
    imageUrl: string = ''
  ) {
    this.id = id;
    this.nom = nom;
    this.description = description;
    this.prix = prix;
    this.id_categorie = id_categorie;
    this.categorie = categorie;
    this.imageUrl = imageUrl;
  }
}
