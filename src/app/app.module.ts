import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { VisualiserProduitsComponent } from './pages/visualiser-produits/visualiser-produits.component';
import { GestionCategorieComponent } from './pages/gestion-categorie/gestion-categorie.component';
import { GestionProduitComponent } from './pages/gestion-produit/gestion-produit.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { CartComponent } from './pages/cart/cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { ClientInscriptionComponent } from './pages/inscription-client/client-inscription.component'; // Import du composant d'inscription client
import { ModifierClientComponent } from './pages/modifier-client/modifier-client.component';


@NgModule({
  declarations: [
    AppComponent,
    VisualiserProduitsComponent,
    GestionCategorieComponent,
    GestionProduitComponent,
    AdminDashboardComponent,
    LoginComponent,
    CartComponent,
    CheckoutComponent,
    ModifierClientComponent,
    ClientInscriptionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}




