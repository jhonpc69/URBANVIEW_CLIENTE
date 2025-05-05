import { Component, OnInit } from '@angular/core';
import { Usuario , UsuariosService } from 'src/services/usuarios.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-usuariospanel',
  templateUrl: './usuariospanel.component.html',
  styleUrls: ['./usuariospanel.component.css']
})
export class UsuariospanelComponent implements OnInit{
  usuarios: Usuario[] = [];
  filteredUsuarios: Usuario[] = [];
  searchQuery: string = '';

  constructor(private usuariosService: UsuariosService) {}

  ngOnInit() {
    this.loadUsuarios();
  }

  loadUsuarios() {
    this.usuariosService.getUsuarios().subscribe(
      (data: Usuario[]) => {
        this.usuarios = data;
        this.filteredUsuarios = data; 
      },
      (error) => {
        console.error('Error al cargar los usuarios', error);
      }
    );
  }
  
  search() {
    const query = this.searchQuery.toLowerCase();
    this.filteredUsuarios = this.usuarios.filter(usuario =>
      usuario.nombre.toLowerCase().includes(query) ||
      usuario.email.toLowerCase().includes(query)
    );
  }

  asignarRolAdmin(idUsuario: number) {
    const usuario = this.usuarios.find(u => u.idUsuario === idUsuario);
    if (usuario) {
      Swal.fire({
        title: '¿Estás seguro?',
        text: `¿Seguro que quieres dar el rol de admin al usuario ${usuario.nombre}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, asignar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.usuariosService.asignarRolAdmin(idUsuario).subscribe(
            () => {
              usuario.rol = 'admin';
              Swal.fire('Asignado', `El usuario ${usuario.nombre} ahora es admin.`, 'success');
            },
            (error) => {
              console.error('Error al asignar el rol de administrador', error);
              Swal.fire('Error', 'Hubo un error al asignar el rol de administrador.', 'error');
            }
          );
        }
      });
    }
  }

  eliminarRolAdmin(idUsuario: number) {
    const usuario = this.usuarios.find(u => u.idUsuario === idUsuario);
    if (usuario) {
      Swal.fire({
        title: '¿Estás seguro?',
        text: `¿Seguro que quieres eliminar el rol de admin del usuario ${usuario.nombre}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.usuariosService.eliminarRolAdmin(idUsuario).subscribe(
            () => {
              usuario.rol = 'user';
              Swal.fire('Eliminado', `El usuario ${usuario.nombre} ya no es admin.`, 'success');
            },
            (error) => {
              console.error('Error al eliminar el rol de administrador', error);
              Swal.fire('Error', 'Hubo un error al eliminar el rol de administrador.', 'error');
            }
          );
        }
      });
    }
  }

}
