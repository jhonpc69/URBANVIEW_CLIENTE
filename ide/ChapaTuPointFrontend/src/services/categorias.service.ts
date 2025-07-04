// categorias.service.ts
import { Injectable } from '@angular/core';
import { HttpClient , HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  constructor(private http: HttpClient) {}

  getCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${base_url}/Categorias/listarCategorias`);
  }

  createCategoria(descripcion: string): Observable<Categoria> {
    const params = new HttpParams().set('descripcion', descripcion);
    return this.http.post<Categoria>(`${base_url}/Categorias/agregarCategoria`, null, { params });
  }

  deleteCategoria(idCategoria: number): Observable<void> {
    const params = new HttpParams().set('idCategoria', idCategoria.toString());
    return this.http.post<void>(`${base_url}/Categorias/eliminarCategoria`, null, { params, responseType: 'text' as 'json' });
  }

}
  
export interface Categoria {
  idCategoria: number;
  nombreCategoria: string;
}