import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  isLoading: boolean = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private clientService: ClientService, private router: Router) {}

  onSubmit(): void {
    this.isLoading = true;
    this.errorMessage = null;

    const payload = {
      email: this.email,
      password: this.password
    };

    this.clientService.login(payload).subscribe({
      next: (response) => {
        this.successMessage = response.message;
        this.isLoading = false;

        // Redirection après 2 secondes
        setTimeout(() => {
          this.router.navigate(['/produits']);
        }, 2000);
      },
      error: (err) => {
        this.errorMessage = err.error.message || 'Erreur de connexion.';
        this.isLoading = false;
      }
    });
  }
}
