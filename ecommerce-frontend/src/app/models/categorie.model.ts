export class Categorie {
  id: number;
  nom: string;
  description: string;

  constructor(id: number = 0, nom: string = '', description: string = '') {
    this.id = id;
    this.nom = nom;
    this.description = description;
  }
}
