import { Component } from '@angular/core';
import { Client, Adresse, Compte } from '../../models/client.model';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-client-inscription',
  templateUrl: './client-inscription.component.html',
  styleUrls: ['./client-inscription.component.css'],
})
export class ClientInscriptionComponent {
  client: Client = {
    nom: '',
    prenom: '',
    phone: '',
    date_naissance: '',
    adresses: [
      { typeAdresse: 'PERSONNELLE', adresse: '', ville: '', province: '', pays: '', codePostal: '' },
      { typeAdresse: 'LIVRAISON', adresse: '', ville: '', province: '', pays: '', codePostal: '' },
    ],
  };

  compte: Compte = {
    email: '',
    password: '',
  };

  confirmEmail: string = ''; // Champ pour confirmer l'email
  isLoading = false; // Indicateur d'état de chargement
  successMessage: string | null = null; // Message de succès
  errorMessage: string | null = null; // Message d'erreur

  constructor(private clientService: ClientService) {}

  /**
   * Méthode appelée lors de la soumission du formulaire
   */
  onSubmit(): void {
    this.isLoading = true;
    this.successMessage = null;
    this.errorMessage = null;

    // Validation : vérifier que les courriels correspondent
    if (this.compte.email !== this.confirmEmail) {
      this.errorMessage = 'Les courriels ne correspondent pas.';
      this.isLoading = false;
      return;
    }

    // Validation des codes postaux (format canadien)
    const postalCodeRegex = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
    if (
      !postalCodeRegex.test(this.client.adresses[0].codePostal) ||
      !postalCodeRegex.test(this.client.adresses[1].codePostal)
    ) {
      this.errorMessage = 'Le code postal doit être au format A1A 1A1.';
      this.isLoading = false;
      return;
    }

    // Préparer le payload
    const payload = {
      compte: this.compte,
      client: this.client,
    };

    // Appeler le service pour envoyer les données
    this.clientService.inscrireClient(payload).subscribe({
      next: () => {
        this.successMessage = 'Inscription réussie !';
        this.resetForm();
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = "Une erreur s'est produite lors de l'inscription.";
        this.isLoading = false;
      },
    });
  }

  /**
   * Réinitialise les champs du formulaire
   */
  resetForm(): void {
    this.client = {
      nom: '',
      prenom: '',
      phone: '',
      date_naissance: '',
      adresses: [
        { typeAdresse: 'PERSONNELLE', adresse: '', ville: '', province: '', pays: '', codePostal: '' },
        { typeAdresse: 'LIVRAISON', adresse: '', ville: '', province: '', pays: '', codePostal: '' },
      ],
    };

    this.compte = {
      email: '',
      password: '',
    };

    this.confirmEmail = ''; // Réinitialiser le champ de confirmation d'email
  }
}
