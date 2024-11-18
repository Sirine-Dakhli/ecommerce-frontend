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

  isLoading = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private clientService: ClientService) {}

  onSubmit(): void {
    this.isLoading = true;
    this.successMessage = null;
    this.errorMessage = null;

    const payload = {
      compte: this.compte,
      client: this.client,
    };

    this.clientService.inscrireClient(payload).subscribe({
      next: (response) => {
        this.successMessage = 'Inscription réussie !';
        this.resetForm();
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = "Une erreur s'est produite lors de l'inscription.";
        console.error(err);
        this.isLoading = false;
      },
    });
  }

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
  }
}
