import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client, Adresse } from '../../models/client.model';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-modifier-client',
  templateUrl: './modifier-client.component.html',
  styleUrls: ['./modifier-client.component.css']
})
export class ModifierClientComponent implements OnInit {
  client: Client = {
    nom: '',
    prenom: '',
    phone: '',
    date_naissance: '',
    adresses: [
      { typeAdresse: 'PERSONNELLE', adresse: '', ville: '', province: '', pays: '', codePostal: '' },
      { typeAdresse: 'LIVRAISON', adresse: '', ville: '', province: '', pays: '', codePostal: '' }
    ]
  };

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

    this.isLoading = true;
    this.clientService.updateClient(this.id, this.client).subscribe({
      next: () => {
        this.successMessage = 'Client mis à jour avec succès.';
        this.isLoading = false;
      },
      error: (err: any) => {
        this.errorMessage = "Une erreur s'est produite lors de la mise à jour.";
        this.isLoading = false;
      }
    });
  }
}
