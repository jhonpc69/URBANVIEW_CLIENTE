import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import Swal from 'sweetalert2'; // Asegúrate de que SweetAlert2 esté importado


import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {
  registrar: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,

  ){
    this.registrar = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      apellido: new FormControl('', [Validators.required]),
      dni: new FormControl('', [Validators.required]),
      telefono: new FormControl('', [Validators.required]),
      claveusuario: new FormControl('', [Validators.required]),
      correo: new FormControl('', [Validators.required]),

    });
  }

  ngOnInit(): void {
  }


  onRegistrar(): void {
    this.registrar.markAllAsTouched(); // Marca todos los campos como tocados para mostrar errores

    if (this.registrar.valid) {
      const { nombre, apellido, dni, telefono, claveusuario, correo } = this.registrar.value;
      this.authService.register(nombre, apellido, dni, telefono, claveusuario, correo).subscribe(
        (response: any) => {
          console.log('Registro exitoso', response);
          Swal.fire({
            icon: 'success',
            title: 'Registro Exitoso',
            text: 'Te has registrado correctamente. Bienvenido!',
          }).then(() => {
            this.router.navigate(['/login']); // Redirige al login
          });
        },
        (error: any) => {
          console.error('Registro fallido', error);
          Swal.fire({
            icon: 'error',
            title: 'Error en el Registro',
            text: 'Hubo un problema al registrar tu cuenta. Por favor, intenta nuevamente.',
          });
        }
      );
    } else {
      console.log('Formulario no válido');

      // Muestra mensajes de error para los campos inválidos
      const invalidFields = Object.keys(this.registrar.controls).filter(key => this.registrar.controls[key].invalid);
      const errorMessages = invalidFields.map(key => {
        const control = this.registrar.controls[key];
        return `${key} es inválido: ${JSON.stringify(control.errors)}`;
      });

      Swal.fire({
        icon: 'warning',
        title: 'Formulario Inválido',
        text: `Por favor corrige los siguientes campos:\n${errorMessages.join('\n')}`,
      });
    }
  }



}
