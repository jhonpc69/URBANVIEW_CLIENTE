import { Component, Input, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { CategoriasService  , Categoria} from 'src/services/categorias.service';  // Asegúrate de la ruta correcta del servicio
import { SolicitudesService } from 'src/services/solicitudes';  // Asegúrate de la ruta correcta del servicio

@Component({
  selector: 'app-solicitud-modal',
  templateUrl: './solicitud-modal.component.html',
  styleUrls: ['./solicitud-modal.component.css']
})
export class SolicitudModalComponent implements OnInit {
  @Input() solicitud: any;
  razonRechazo: string = '';
  categorias: Categoria[] = [];

  constructor(private solicitudesService: SolicitudesService,
    private categoriasService: CategoriasService) {}

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

  getCategoriaNombre(idCategoria: number): string {
    const categoria = this.categorias.find(cat => cat.idCategoria === idCategoria);
    return categoria ? categoria.nombreCategoria : 'Desconocida';
  }

  closeModal(): void {
    const modal = document.getElementById('solicitudModal');
    if (modal) {
      modal.style.display = 'none';
    }
  }

  rechazarSolicitud(): void {
    this.openRechazoModal();
  }

  openRechazoModal(): void {
    const modal = document.getElementById('rechazoModal');
    if (modal) {
      modal.style.display = 'block';
    }
  }

  closeRechazoModal(): void {
    const modal = document.getElementById('rechazoModal');
    if (modal) {
      modal.style.display = 'none';
    }
  }

  enviarRechazo(): void {
    if (this.razonRechazo) {
      Swal.fire({
        title: '¿Estás seguro?',
        text: "No podrás revertir esto",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, rechazar'
      }).then((result) => {
        if (result.isConfirmed) {
          // Consumir el servicio para rechazar la solicitud con el comentario
          const idSolicitud = this.solicitud.idSolicitud;
          const decision = 'FALSE';  // Para rechazo
          const comentario = this.razonRechazo;

          this.solicitudesService.decisionSolicitud(idSolicitud, decision, comentario).subscribe(
            (response) => {
              Swal.fire('Rechazada', 'La solicitud ha sido rechazada', 'success');
              this.closeRechazoModal();
              this.closeModal();
            },
            (error) => {
              Swal.fire('Error', 'Ocurrió un error al rechazar la solicitud', 'error');
            }
          );
        }
      });
    }
  }

  aceptarSolicitud(): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Aceptarás esta solicitud",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, aceptar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Consumir el servicio para aceptar la solicitud sin comentario
        const idSolicitud = this.solicitud.idSolicitud;
        const decision = 'TRUE';  // Para aceptación

        this.solicitudesService.decisionSolicitud(idSolicitud, decision).subscribe(
          (response) => {
            Swal.fire('Aceptada', 'La solicitud ha sido aceptada', 'success');
            this.closeModal();
          },
          (error) => {
            Swal.fire('Error', 'Ocurrió un error al aceptar la solicitud', 'error');
          }
        );
      }
    });
  }


  // Método para descargar el PDF
  descargarPDF() {
    const rutaCodificada = encodeURIComponent(this.solicitud.rutaPdf); // Codifica la ruta
    this.solicitudesService.descargarPDF(rutaCodificada).subscribe(
      (blob: Blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'documento.pdf'; // Cambia el nombre del archivo aquí
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      },
      (error) => {
        Swal.fire('Error', 'Ocurrió un error al descargar el archivo', 'error');
      }
    );
  }
}
