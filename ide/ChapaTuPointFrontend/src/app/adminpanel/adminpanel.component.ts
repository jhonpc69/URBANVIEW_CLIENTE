import { Component, OnInit } from '@angular/core';
import { NotificacionService } from 'src/services/notificacion.service';  // Importa el servicio

@Component({
  selector: 'app-adminpanel',
  templateUrl: './adminpanel.component.html',
  styleUrls: ['./adminpanel.component.css']
})
export class AdminpanelComponent implements OnInit {
  solicitudes: any[] = [];  // Aquí se almacenarán las solicitudes obtenidas del servicio
  selectedSolicitud: any = null;
   items : any[] =  [];

  constructor(private solicitudesService: NotificacionService) {}  // Inyecta el servicio

  ngOnInit(): void {
    this.cargarSolicitudes();  // Cargar solicitudes al inicializar el componente
  }

  // Método para cargar las solicitudes usando el servicio
  cargarSolicitudes(): void {
    this.solicitudesService.listarSolicitudes().subscribe(
      
      (data: any[]) => {
        this.items = data.map(item => {
          item.imagenes = item.imagenes.map((img: string) => `data:image/png;base64,${img}`);
          return item;
        });
      },
      (error) => {
        console.error('Error al obtener las publicaciones', error);
      }
    );
  }

  // Método para abrir el modal con la solicitud seleccionada
  openModal(solicitud: any): void {
    this.selectedSolicitud = solicitud;
    const modal = document.getElementById('solicitudModal');
    if (modal) {
      modal.style.display = 'block';
    }
  }
}
