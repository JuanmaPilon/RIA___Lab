import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Sesion {
  constructor() {}

  // Método para obtener el usuario actual
  getCurrentUser(): any {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }

  // Método para cerrar sesión
  logout(): void {
    localStorage.removeItem('currentUser');
  }

  // Método para verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  }
}
