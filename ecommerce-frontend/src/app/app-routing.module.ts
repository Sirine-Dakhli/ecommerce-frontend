import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { VisualiserProduitsComponent } from './pages/visualiser-produits/visualiser-produits.component';
import { ClientInscriptionComponent } from './pages/inscription-client/client-inscription.component'; // Import du composant d'inscription client

import { ModifierClientComponent } from './pages/modifier-client/modifier-client.component';





const routes: Routes = [
  { path: '', redirectTo: '/produits', pathMatch: 'full' },
  { path: 'modifier-client/:id', component: ModifierClientComponent },
  { path: 'produits', component: VisualiserProduitsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'inscription-client', component: ClientInscriptionComponent } // Ajout de la route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
