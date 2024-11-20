import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Import FormsModule et ReactiveFormsModule
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VisualiserProduitsComponent } from './pages/visualiser-produits/visualiser-produits.component';
import { GestionCategorieComponent } from './pages/gestion-categorie/gestion-categorie.component';
import { GestionProduitComponent } from './pages/gestion-produit/gestion-produit.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { CartComponent } from './pages/cart/cart.component';
import { UserService } from './services/user.service';
import { ModifierClientComponent } from './pages/modifier-client/modifier-client.component';
import { ClientInscriptionComponent } from './pages/inscription-client/client-inscription.component';
// Ajoutez d'autres services ici si nécessaire

@NgModule({
  declarations: [
    AppComponent,
    VisualiserProduitsComponent,
    GestionCategorieComponent,
    GestionProduitComponent,
    AdminDashboardComponent,
    LoginComponent,
    CartComponent,
    ModifierClientComponent,
    ClientInscriptionComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule, // Ajout de FormsModule pour ngModel
    ReactiveFormsModule, // Pour les formulaires réactifs si nécessaires
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [
    UserService,
    // Ajoutez d'autres services si nécessaire, comme CartService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
