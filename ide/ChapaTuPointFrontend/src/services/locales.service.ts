
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class LocalesService {

  constructor(private http: HttpClient) {}

  getLocales(): Observable<Local[]> {
    const url = `${base_url}/Locales/listarLocales`;
    return this.http.get<Local[]>(url);
  }

  deleteLocal(idLocal: number): Observable<void> {
    const params = new HttpParams().set('idLocales', idLocal);
    const url = `${base_url}/Locales/eliminarLocales`;
    return this.http.post<void>(url, null, { params, responseType: 'text' as 'json' });
  }
}

// Define la interfaz Local
export interface Local {
  idPublicacion: number;
  idLocal: number;
  descripcion: string;
  horaApertura: string;
  horaCierre: string;
  estado: string;
  fechaPublicacion: string;
  linkInstagram: string;
  linkFacebook: string;
  linkMaps: string;
  imagenes: string[];
  nombreLocal: string;
}