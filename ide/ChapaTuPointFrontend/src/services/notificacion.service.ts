import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment";
import { HttpClient, HttpParams } from '@angular/common/http';import { Observable } from 'rxjs';
const base_url = environment.base_url;


@Injectable({
    providedIn: 'root'
})
export class NotificacionService {
    private baseUrl: string = base_url; // URL base de la API
  
    constructor(private http: HttpClient) {}
    
    listarSolicitudes(): Observable<any> {
      return this.http.get(`${this.baseUrl}/Solicitudes/ListarSolicitudes`);
    }
  
    listarSolicitudesPorIdUsuario(idUsuario: number): Observable<any> {
      let params = new HttpParams().set('idUsuario', idUsuario);
      return this.http.get(`${this.baseUrl}/Solicitudes/ListarSolicitudesPorIdUsuario`, { params });
    }
  
  }