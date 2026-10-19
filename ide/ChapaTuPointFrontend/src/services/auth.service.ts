import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  usuario: { idUsuario: number; nombresCompletos: string; dni: string; tipoUsuario: number };
}

@Injectable({providedIn: 'root'})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    const params = new HttpParams().set('email', email).set('password', password);
    return this.http.post<{status: boolean; message: string}>(`${environment.base_url}/auth/login`, null, {params});
  }

  verifyCode(email: string, password: string, code: string) {
    const params = new HttpParams().set('email', email).set('claveUsuario', password).set('code', code);
    return this.http.post<AuthResponse>(`${environment.base_url}/auth/verify-code`, null, {params}).pipe(
      tap(response => {
        localStorage.setItem('accessToken', response.access_token);
        localStorage.setItem('refreshToken', response.refresh_token);
        for (const [key, value] of Object.entries(response.usuario)) {
          localStorage.setItem(key, String(value));
        }
      })
    );
  }

  register(nombre: string, apellido: string, dni: string, telefono: string, claveusuario: string, correo: string) {
    const params = new HttpParams().set('nombre', nombre).set('apellido', apellido).set('dni', dni)
      .set('telefono', telefono).set('claveusuario', claveusuario).set('correo', correo);
    return this.http.post(`${environment.base_url}/Usuarios/registrarUsuarios`, null, {params});
  }
}
