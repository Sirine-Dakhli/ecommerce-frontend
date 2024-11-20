import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userData: any = null;
  private cartData: any[] = [];

  setUserData(data: any): void {
    if (data && typeof data === 'object') {
      this.userData = data;
      console.log('Données utilisateur stockées:', this.userData);
    } else {
      console.error('Données utilisateur invalides:', data);
    }
  }

  getUserData(): any {
    if (this.userData) {
      return this.userData;
    }
    console.warn('Aucune donnée utilisateur trouvée.');
    return null;
  }

  setCartData(cart: any[]): void {
    if (Array.isArray(cart)) {
      this.cartData = cart;
    } else {
      console.error('Données de panier invalides:', cart);
    }
  }

  getCartData(): any[] {
    return this.cartData;
  }

  isLoggedIn(): boolean {
    return !!this.userData;
  }
}
