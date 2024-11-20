import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VisualiserProduitsComponent } from './pages/visualiser-produits/visualiser-produits.component';
import { GestionCategorieComponent } from './pages/gestion-categorie/gestion-categorie.component';
import { GestionProduitComponent } from './pages/gestion-produit/gestion-produit.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { UserService } from './services/user.service';
import { CartComponent } from './pages/cart/cart.component';
@NgModule({
  declarations: [
    AppComponent,
    VisualiserProduitsComponent,
    GestionCategorieComponent,
    GestionProduitComponent,
    AdminDashboardComponent,
    LoginComponent,
    CartComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule, // Ajout de FormsModule pour ngModel
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [UserService], // Déclarez UserService ici
  bootstrap: [AppComponent],
})
export class AppModule {}
