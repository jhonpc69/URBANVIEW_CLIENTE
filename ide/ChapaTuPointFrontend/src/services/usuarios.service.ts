import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http: HttpClient) {}

// getUsuarios(): Observable<Usuario[]> {
//   const url = `${base_url}/Usuarios/listarUsuarios`;
//   return this.http.get<Usuario[]>(url);
// }

// asignarRolAdmin(idUsuario: number): Observable<void> {
//   const url = `${base_url}/Usuarios/asignarRolAdmin`;
//   return this.http.post<void>(url, { idUsuario });
// }

// eliminarRolAdmin(idUsuario: number): Observable<void> {
//   const url = `${base_url}/Usuarios/eliminarRolAdmin`;
//   return this.http.post<void>(url, { idUsuario });
// }

  getUsuarios(): Observable<Usuario[]> {

    const fakeUsuarios: Usuario[] = [
      { idUsuario: 1, nombre: 'Juan Pérez', email: 'juan.perez@example.com', rol: 'user' },
      { idUsuario: 2, nombre: 'María García', email: 'maria.garcia@example.com', rol: 'user' },
      { idUsuario: 3, nombre: 'Carlos López', email: 'carlos.lopez@example.com', rol: 'admin' },
      { idUsuario: 4, nombre: 'Ana Fernández', email: 'ana.fernandez@example.com', rol: 'user' }
    ];
    return of(fakeUsuarios);
  }

  asignarRolAdmin(idUsuario: number): Observable<void> {

    console.log(`Asignando rol de admin al usuario con id ${idUsuario}`);
    return of();
  }

  eliminarRolAdmin(idUsuario: number): Observable<void> {

    console.log(`Eliminando rol de admin del usuario con id ${idUsuario}`);
    return of();
  }
}




export interface Usuario {
  idUsuario: number;
  nombre: string;
  email: string;
  rol: string;
}