import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent {
  compte: any = { email: '', password: '' };
  isLoading: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient) {}

  onLogin() {
    this.isLoading = true;
    this.successMessage = '';
    this.errorMessage = '';

    const loginPayload = {
      compte: this.compte,
      panier: { id: 10 } // ID du panier (ajustez si nécessaire)
    };

    this.http.post('http://localhost:8082/api/internaute/connecter', loginPayload).subscribe(
      (response: any) => {
        this.isLoading = false;
        this.successMessage = 'Connexion réussie !';
      },
      (error) => {
        this.isLoading = false;
        this.errorMessage = 'Erreur de connexion. Vérifiez vos informations.';
      }
    );
  }
}
