import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

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

  constructor(private http: HttpClient, private router: Router) {}

  onLogin() {
    this.isLoading = true;
    this.successMessage = '';
    this.errorMessage = '';

    const loginPayload = {
      compte: this.compte
    };

    this.http.post('http://localhost:8082/api/internaute/connecter', loginPayload).subscribe(
      (response: any) => {
        this.isLoading = false;
        // Assurez-vous que `response` contient les données utilisateur (nom, prénom, etc.)
        const nom = response?.compte?.nom || 'Utilisateur';
        const prenom = response?.compte?.prenom || '';
        localStorage.setItem('user', JSON.stringify({ nom, prenom }));
        this.successMessage = 'Connexion réussie ! Redirection en cours...';

        // Redirigez vers la page d'accueil
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 1500);
      },
      (error) => {
        this.isLoading = false;
        this.errorMessage = 'Erreur de connexion. Vérifiez vos informations.';
      }
    );
  }
}
