import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const isLoggedIn = !!localStorage.getItem('idUsuario'); 
    const tipoUsuario = localStorage.getItem('tipoUsuario');
    if (isLoggedIn && tipoUsuario === '1') {
      return true;
    } else {
      this.router.navigate(['/home']);
      return false;
    }
  }
}