import { Component, OnInit } from '@angular/core';
import { NotificacionService } from 'src/services/notificacion.service';  // Importa el servicio
import Swal from 'sweetalert2'; // Asegúrate de importar SweetAlert2

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userName: string | null = null;
  tipoUsuario: number | null = null;
  idUsuario: number | null = null;
  notifications: any[] = [];

  constructor(private notificacionService: NotificacionService) {}  // Inyecta el servicio

  ngOnInit(): void {
    this.loadUserData();
    this.loadNotifications();  // Carga las notificaciones
  }

  loadUserData(): void {
    const nombresCompletos = localStorage.getItem('nombresCompletos');
    const tipoUsuario = localStorage.getItem('tipoUsuario');
    const idUsuario = localStorage.getItem('idUsuario');  // Obtén el ID de usuario del localStorage

    if (nombresCompletos) {
      this.userName = nombresCompletos.split(' ')[0];
    }
    if (tipoUsuario) {
      this.tipoUsuario = parseInt(tipoUsuario, 10);
    }
    if (idUsuario) {
      this.idUsuario = parseInt(idUsuario, 10);
    }
  }

  loadNotifications(): void {
    if (this.tipoUsuario === 1) {
      // Si el tipo de usuario es 1, lista todas las solicitudes
      this.notificacionService.listarSolicitudes().subscribe(
        (data) => {
          this.notifications = data;
        },
        (error) => {
          console.error('Error al cargar las solicitudes', error);
        }
      );
    } else if (this.tipoUsuario === 0 && this.idUsuario !== null) {
      // Si el tipo de usuario es 0, lista las solicitudes por ID de usuario
      this.notificacionService.listarSolicitudesPorIdUsuario(this.idUsuario).subscribe(
        (data) => {
          this.notifications = data;
        },
        (error) => {
          console.error('Error al cargar las solicitudes por usuario', error);
        }
      );
    }
  }

  handleNotificationClick(): void {
    const modal = document.getElementById('notificationModal');
    if (modal) {
      modal.style.display = 'block';
    }
  }

  closeNotificationModal(): void {
    const modal = document.getElementById('notificationModal');
    if (modal) {
      modal.style.display = 'none';
    }
  }

  getNotificationClass(estado: string): string {
    switch (estado) {
      case 'EN PROCESO':
        return 'alert alert-info';
      case 'ACEPTADO':
        return 'alert alert-success';
      case 'RECHAZADO':
        return 'alert alert-danger';
      default:
        return '';
    }
  }
  logout(): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Deseas cerrar sesión?',
      icon: 'warning',
      showCancelButton: true, // Mostrar botón de cancelar
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'No, permanecer aquí',
      reverseButtons: true // Invierte el orden de los botones
    }).then((result) => {
      if (result.isConfirmed) {
        // Si el usuario confirma
        localStorage.clear();
        this.userName = null;
        this.tipoUsuario = null;
        this.idUsuario = null;
        Swal.fire({
          title: 'Sesión cerrada',
          text: 'Has cerrado sesión exitosamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Si el usuario cancela
        Swal.fire({
          title: 'Cancelado',
          text: 'Permanecerás en tu sesión actual.',
          icon: 'info',
          confirmButtonText: 'Aceptar'
        });
      }
    });
  }
  
}
