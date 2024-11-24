// src/app/models/categorie.model.ts
export class Categorie {
  id: number; // ID de la catégorie
  nom: string; // Nom de la catégorie
  description: string; // Description de la catégorie

  constructor(id: number = 0, nom: string = '', description: string = '') {
    this.id = id;
    this.nom = nom;
    this.description = description;
  }
}
