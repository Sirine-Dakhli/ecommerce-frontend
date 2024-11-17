export class Categorie {
  id: number; // Assurez-vous que 'id' est de type 'number' et non 'number | undefined'
  nom: string;
  description: string;

  constructor(id: number = 0, nom: string = '', description: string = '') {
    this.id = id;
    this.nom = nom;
    this.description = description;
  }
}

