export class Adresse {
  typeAdresse!: string;
  adresse!: string;
  ville!: string;
  province!: string;
  pays!: string;
  codePostal!: string;
}

export class Client {
  nom!: string;
  prenom!: string;
  phone!: string;
  date_naissance!: string;
  adresses!: Adresse[];
}

export class Compte {
  email!: string;
  password!: string;
}
