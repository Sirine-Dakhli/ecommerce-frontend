import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ModifierClientComponent } from './pages/modifier-client/modifier-client.component';
import { LoginComponent } from './pages/login/login.component';
import { AppComponent } from './app.component';
import { VisualiserProduitsComponent } from './pages/visualiser-produits/visualiser-produits.component';
import { ClientInscriptionComponent } from './pages/inscription-client/client-inscription.component'; // Import du composant d'inscription client

@NgModule({
  declarations: [
    ModifierClientComponent,
    AppComponent,
    VisualiserProduitsComponent,
    ClientInscriptionComponent, // Déclaration du composant
    LoginComponent
  
    
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
