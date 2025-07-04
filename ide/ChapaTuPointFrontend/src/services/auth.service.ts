import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Router } from "@angular/router";
import {catchError, tap} from 'rxjs/operators';
import { throwError } from 'rxjs';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  login(user: string, password: string) {
    const params = new HttpParams()
      .set('email', user)
      .set('password', password);

    return this.http.post(`${base_url}/auth/login`, null, { params })
      .pipe(
        tap((response: any) => {
          localStorage.setItem('accessToken', response.access_token);
          console.log(response.access_token);

          localStorage.setItem('refreshToken', response.refresh_token);
          console.log(response.access_token);

          localStorage.setItem('idUsuario', response.usuario.idUsuario.toString());
          console.log(response.usuario.idUsuario.toString());

          localStorage.setItem('nombresCompletos', response.usuario.nombresCompletos);
          console.log(response.usuario.nombresCompletos.toString());

          localStorage.setItem('dni', response.usuario.dni.toString());
          console.log(response.usuario.dni.toString());

          localStorage.setItem('tipoUsuario', response.usuario.tipoUsuario.toString());
          console.log(response.usuario.tipoUsuario.toString());

        }),

        catchError(error => {
          console.error('Login error', error);
          return throwError(error);
        })
      );
  }


  register(nombre: string, apellido: string,dni: string, telefono : string, claveusuario: string,correo: string) {
    const params = new HttpParams()
      .set('nombre', nombre)
      .set('apellido', apellido)
      .set('dni', dni)
      .set('telefono', telefono)
      .set('claveusuario', claveusuario)
      .set('correo', correo);

    return this.http.post(`${base_url}/Usuarios/registrarUsuarios`, null, { params })
      .pipe(
        catchError(error => {
          console.error('registererror error', error);
          return throwError(error);
        })
      );
  }
}



