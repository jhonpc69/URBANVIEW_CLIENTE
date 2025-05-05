// categorias.component.ts
import { Component, OnInit } from '@angular/core';
import { CategoriasService, Categoria } from 'src/services/categorias.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {
  categorias: Categoria[] = [];
  descripcion: string = '';

  constructor(private categoriasService: CategoriasService) {}

  ngOnInit() {
    this.loadCategorias();
  }

  loadCategorias() {
    this.categoriasService.getCategorias().subscribe(
      (data: Categoria[]) => {
        this.categorias = data;
      },
      (error) => {
        console.error('Error al cargar las categorías', error);
      }
    );
  }

  createCategoria() {
    this.categoriasService.createCategoria(this.descripcion).subscribe(
      (data: Categoria) => {
        this.categorias.push(data);
        this.descripcion = '';
        Swal.fire({
          icon: 'success',
          title: '¡Categoría añadida!',
          text: `La categoría "${data.nombreCategoria}" se ha añadido correctamente.`,
          confirmButtonText: 'OK'
        });
      },
      (error) => {
        console.error('Error al crear la categoría', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un error al crear la categoría.',
          confirmButtonText: 'OK'
        });
      }
    );
  }

  deleteCategoria(idCategoria: number) {
    const categoria = this.categorias.find(c => c.idCategoria === idCategoria);
    const nombreCategoria = categoria ? categoria.nombreCategoria : 'esta categoría';

    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Seguro que quieres eliminar la categoría "${nombreCategoria}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoriasService.deleteCategoria(idCategoria).subscribe(
          () => {
            this.categorias = this.categorias.filter(c => c.idCategoria !== idCategoria);
            Swal.fire(
              'Eliminado',
              `La categoría "${nombreCategoria}" ha sido eliminada.`,
              'success'
            );
          },
          (error) => {
            console.error('Error al eliminar la categoría', error);
            Swal.fire(
              'Error',
              'Hubo un error al eliminar la categoría.',
              'error'
            );
          }
        );
      }
    });
  }
}