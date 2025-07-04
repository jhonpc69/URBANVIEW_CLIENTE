import { Component } from '@angular/core';
import * as bootstrap from 'bootstrap';
import { PublicacionesService } from 'src/services/publicaciones.service';
import { ActivatedRoute } from '@angular/router';
import { ComentarService } from 'src/services/comentar.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-recomendados',
  templateUrl: './recomendados.component.html',
  styleUrls: ['./recomendados.component.css']
})
export class RecomendadosComponent {
  items : any[] =  [];
  titulo: string = ''; 
  isLoading = false;
  selectedItem: any;
  selectedImage: any;
  newComment: string = '';
  localStorageUserId: string | null = '';


  constructor(
    private publicacionesService: PublicacionesService,
    private route: ActivatedRoute ,
    private comentarService: ComentarService
) {}


ngOnInit(): void {
  this.localStorageUserId = localStorage.getItem('idUsuario');
  console.log('Local Storage User ID:', this.localStorageUserId);

  // Escuchamos los parámetros de la ruta
  this.route.queryParams.subscribe(params => {
    const idCategoria = params['idCategoria'];
    if (idCategoria) {
      // Llamamos al método con el texto de búsqueda vacío inicialmente
      this.fetchPublicaciones(idCategoria, '');
    }
  });}


  fetchPublicaciones(idCategoria: number, titulo: string): void {
    this.isLoading = true; // Muestra el spinner
    this.publicacionesService.listarPublicaciones(idCategoria, titulo).subscribe(
      (data: any[]) => {
        this.items = data.map(item => {
          // Procesamos las imágenes para que sean interpretables por el navegador
          item.imagenes = item.imagenes.map((img: string) => `data:image/png;base64,${img}`);
          return item;
        });
        this.isLoading = false; // Oculta el spinner
      },
      (error) => {
        console.error('Error al obtener las publicaciones', error);
        this.isLoading = false; // Oculta el spinner incluso si hay error
      }
    );
  }

  onSearch(): void {
    const idCategoria = this.route.snapshot.queryParams['idCategoria']; // Obtenemos el ID de la categoría
    if (idCategoria) {
      this.fetchPublicaciones(idCategoria, this.titulo);
    }
  }

addComment(idPublicacion: number): void {
  const idUsuario = parseInt(this.localStorageUserId ?? '0', 10);

  Swal.fire({
    title: '¿Seguro que desea comentar?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, comentar',
    cancelButtonText: 'No, cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      this.comentarService.agregarComentario(this.newComment, idPublicacion, idUsuario).subscribe(response => {
        console.log('Comentario agregado:', response);
        this.newComment = '';
        Swal.fire('Comentario agregado', '', 'success');
        this.updateLocalComments(idPublicacion, response); 
      }, error => {
        console.error('Error al agregar comentario:', error);
        Swal.fire('Error al agregar comentario', '', 'error');
      });
    }
  });
}

updateLocalComments(idPublicacion: number, newComment: any): void {
  const item = this.items.find(item => item.idPublicacion === idPublicacion);
  if (item) {
    item.comentarios.push(newComment);
  }
}

isLoggedIn(): boolean {

  return false;
}
redirectToLogin() {

  window.location.href = '/login';
}


  openModal(id: number) {
    // Encuentra el item seleccionado basado en el id
    this.selectedItem = this.items.find(item => item.idPublicacion === id);
    
    if (this.selectedItem) {
      // Asigna la primera imagen del item seleccionado
      this.selectedImage = this.selectedItem.imagenes[0];
      
      // Abre el modal correspondiente
      const modalElement = document.getElementById(`itemModal${id}`);
      if (modalElement) {
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
      } else {
        console.error(`El elemento con ID "itemModal${id}" no existe en el DOM.`);
      }
    } else {
      console.error(`No se encontró el item con ID: ${id}`);
    }
  }

  changeImage(image: string) {
    this.selectedImage = image;
  }
}  