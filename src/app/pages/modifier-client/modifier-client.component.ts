import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-modifier-client',
  templateUrl: './modifier-client.component.html',
  styleUrls: ['./modifier-client.component.css']
})
export class ModifierClientComponent implements OnInit {
  client: any = {
    nom: '',
    prenom: '',
    phone: '',
    date_naissance: '',
    adresses: [
      { typeAdresse: 'PERSONNELLE', adresse: '', ville: '', province: '', pays: '', codePostal: '' },
      { typeAdresse: 'LIVRAISON', adresse: '', ville: '', province: '', pays: '', codePostal: '' }
    ]
  };

  compte: any = {
    email: '',
    password: ''
  };

  confirmEmail: string = ''; // Champ pour confirmer l'email
  id: string | null = null;
  isLoading = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private clientService: ClientService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.getClient(this.id);
    }
  }

  getClient(id: string): void {
    this.isLoading = true;
    this.clientService.getClient(id).subscribe({
      next: (response: any) => {
        // Initialiser le client à partir de la réponse
        this.client = {
          nom: response.nom || '',
          prenom: response.prenom || '',
          phone: response.phone || '',
          date_naissance: response.date_naissance || '',
          adresses: response.adresses || []
        };

        // Initialiser le compte
        this.compte = {
          email: response.compte?.email || '',
          password: '' // Ne pas charger le mot de passe pour des raisons de sécurité
        };

        // Ajouter des valeurs par défaut si les adresses sont absentes ou incomplètes
        if (!this.client.adresses[0]) {
          this.client.adresses[0] = {
            typeAdresse: 'PERSONNELLE',
            adresse: '',
            ville: '',
            province: '',
            pays: '',
            codePostal: ''
          };
        }
        if (!this.client.adresses[1]) {
          this.client.adresses[1] = {
            typeAdresse: 'LIVRAISON',
            adresse: '',
            ville: '',
            province: '',
            pays: '',
            codePostal: ''
          };
        }

        this.isLoading = false;
      },
      error: (err: any) => {
        this.errorMessage = "Une erreur s'est produite lors de la récupération des données.";
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  onSubmit(): void {
    if (!this.id) return;

    // Validation : vérifier que les courriels correspondent
    if (this.compte.email !== this.confirmEmail) {
      this.errorMessage = 'Les courriels ne correspondent pas.';
      return;
    }

    // Validation des codes postaux (format canadien)
    const postalCodeRegex = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
    if (
      !postalCodeRegex.test(this.client.adresses[0].codePostal) ||
      !postalCodeRegex.test(this.client.adresses[1].codePostal)
    ) {
      this.errorMessage = 'Le code postal doit être au format A1A 1A1.';
      return;
    }

    // Préparer le payload
    const payload = {
      compte: this.compte,
      client: this.client
    };

    this.isLoading = true;
    this.clientService.updateClient(this.id, payload).subscribe({
      next: () => {
        this.successMessage = 'Client mis à jour avec succès.';
        this.isLoading = false;
      },
      error: (err: any) => {
        this.errorMessage = "Une erreur s'est produite lors de la mise à jour.";
        this.isLoading = false;
        console.error(err);
      }
    });
  }
}
