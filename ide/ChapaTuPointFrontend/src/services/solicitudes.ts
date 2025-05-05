import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment";
import { HttpClient, HttpParams } from '@angular/common/http';import { Observable } from 'rxjs';
const base_url = environment.base_url;


@Injectable({
    providedIn: 'root'
})
export class SolicitudesService {
    private baseUrl: string = 'http://localhost:8081';

    constructor(private http: HttpClient) {}

    grabarSolicitud(formData: FormData): Observable<any> {
      const url = `${this.baseUrl}/Solicitudes/GrabarSolicitud`;


      return this.http.post(url, formData);
    }

    getTipos(): Observable<any> {
      const url = `${this.baseUrl}/Categorias/listarCategorias`;
      return this.http.get(url);
    }
    decisionSolicitud(idSolicitud: number, decision: string, comentario?: string): Observable<any> {
      const url = `${this.baseUrl}/Solicitudes/DecisionSolicitud`;

      // Configurar los parámetros
      let params = new HttpParams()
        .set('idSolicitud', idSolicitud.toString())
        .set('decision', decision);

      // Solo añadir el comentario si existe
      if (comentario) {
        params = params.set('comentario', comentario);
      }

      return this.http.post(url, null, { params });
    }

    getLocales(): Observable<any> {
      const url = `${this.baseUrl}/Locales/listarLocales`;
      return this.http.get(url);
    }

     // Método para obtener las categorías
  getCategorias(): Observable<any> {
    const url = `${this.baseUrl}/Categorias/listarCategorias`;
    return this.http.get(url);
  }


  descargarPDF(ruta: string): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/Solicitudes/descargarAdjunto?ruta=${ruta}`, { responseType: 'blob' });
  }
  }
