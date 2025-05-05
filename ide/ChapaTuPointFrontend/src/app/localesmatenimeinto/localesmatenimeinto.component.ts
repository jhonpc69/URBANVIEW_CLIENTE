import { Component, OnInit } from '@angular/core';
import { Local, LocalesService } from 'src/services/locales.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-localesmatenimeinto',
  templateUrl: './localesmatenimeinto.component.html',
  styleUrls: ['./localesmatenimeinto.component.css']
})
export class LocalesmatenimeintoComponent implements OnInit {
  locales: Local[] = [];
  filteredLocales: Local[] = [];
  searchQuery: string = '';

  constructor(private localesService: LocalesService) {}

  ngOnInit() {
    this.loadLocales();
  }

  loadLocales() {
    this.localesService.getLocales().subscribe(
      (data: Local[]) => {
        this.locales = data;
        this.filteredLocales = data; 
      },
      (error) => {
        console.error('Error al cargar los locales', error);
      }
    );
  }

  search() {
    const query = this.searchQuery.toLowerCase();
    this.filteredLocales = this.locales.filter(local =>
      local.nombreLocal.toLowerCase().includes(query) ||
      local.descripcion.toLowerCase().includes(query)
    );
  }

  deleteLocal(idLocal: number) {
    const local = this.locales.find(l => l.idLocal === idLocal);
    const nombreLocal = local ? local.nombreLocal : 'este local';

    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Seguro que quieres eliminar el local "${nombreLocal}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.localesService.deleteLocal(idLocal).subscribe(
          () => {
            this.locales = this.locales.filter(local => local.idLocal !== idLocal);
            this.filteredLocales = this.filteredLocales.filter(local => local.idLocal !== idLocal);
            Swal.fire(
              'Eliminado',
              `El local "${nombreLocal}" ha sido eliminado.`,
              'success'
            );
          },
          (error) => {
            console.error('Error al eliminar el local', error);
            Swal.fire(
              'Error',
              'Hubo un error al eliminar el local.',
              'error'
            );
          }
        );
      }
    });
  }
}