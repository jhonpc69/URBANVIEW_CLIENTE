// categorias.service.ts
import { Injectable } from '@angular/core';
import { HttpClient , HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ComentarService {

  constructor(private http: HttpClient) {}

  agregarComentario(comentario: string, idPublicacion: number, idUsuario: number): Observable<any> {
    const params = new HttpParams()
      .set('comentario', comentario)
      .set('idPublicacion', idPublicacion.toString())
      .set('idUsuario', idUsuario.toString());

    return this.http.post(`${base_url}/Comentarios/agregarComentarios`, null, { params });  }
}



  