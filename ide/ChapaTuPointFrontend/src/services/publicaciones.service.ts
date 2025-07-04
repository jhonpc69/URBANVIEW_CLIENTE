import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment";
import { HttpClient, HttpParams } from '@angular/common/http';import { Observable } from 'rxjs';
const base_url = environment.base_url;

@Injectable({
    providedIn: 'root'
})
export class PublicacionesService {

    constructor(private http: HttpClient) {}
    listarPublicaciones(idCategoria: number,titulo: string): Observable<any[]> {
        
        const params = new HttpParams().set('idCategoria', idCategoria).set('titulo',titulo);

        return this.http.get<any[]>(`${base_url}/Publicaciones/listarPublicaciones`, { params });
}



}