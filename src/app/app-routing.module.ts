import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VisualiserProduitsComponent } from './pages/visualiser-produits/visualiser-produits.component';
import { GestionCategorieComponent } from './pages/gestion-categorie/gestion-categorie.component';
import { GestionProduitComponent } from './pages/gestion-produit/gestion-produit.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { ClientInscriptionComponent } from './pages/inscription-client/client-inscription.component';
import { ModifierClientComponent } from './pages/modifier-client/modifier-client.component';
import { CartComponent } from './pages/cart/cart.component';

const routes: Routes = [
  { path: '', redirectTo: '/produits', pathMatch: 'full' },
  { path: 'produits', component: VisualiserProduitsComponent },
  { path: 'admin', component: AdminDashboardComponent },
  { path: 'admin/gestion-categorie', component: GestionCategorieComponent },
  { path: 'admin/gestion-produit', component: GestionProduitComponent },
  { path: 'login', component: LoginComponent },
  { path: 'panier', component: CartComponent },
  { path: 'inscription-client', component: ClientInscriptionComponent } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
