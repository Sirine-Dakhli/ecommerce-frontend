import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VisualiserProduitsComponent } from './pages/visualiser-produits/visualiser-produits.component';
import { GestionCategorieComponent } from './pages/gestion-categorie/gestion-categorie.component';
import { GestionProduitComponent } from './pages/gestion-produit/gestion-produit.component';
import { ClientInscriptionComponent } from './pages/inscription-client/client-inscription.component'; // Import du composant
import { RouterModule } from '@angular/router';
import { CategorieService } from './services/categorie.service';
import { ConnexionComponent } from './pages/connexion/connexion.component'; // Import du composant de connexion

@NgModule({
  declarations: [
    AppComponent,
    VisualiserProduitsComponent,
    GestionCategorieComponent,
    GestionProduitComponent,
    ClientInscriptionComponent, // Déclaration du composant
    ConnexionComponent // Ajout du composant Connexion
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
    HttpClientModule
  ],
  providers: [CategorieService],
  bootstrap: [AppComponent]
})
export class AppModule {}
