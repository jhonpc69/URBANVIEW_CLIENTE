import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { AuthService } from 'src/services/auth.service';
import { ModalService } from 'src/services/modal.service';
import { tap } from 'rxjs/operators';
import Swal from 'sweetalert2'; // Asegúrate de importar SweetAlert2

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('loginmodal')
  loginmodal!: ElementRef;
  loguin: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private modalService: ModalService
  ) {
    this.loguin = new FormGroup({
      user: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });

    this.modalService.modalState$.subscribe(state => {
      if (state) {
        this.openModal();
      } else {
        this.closeModal();
      }
    });
  }

  ngOnInit(): void {
    this.loadUserData();
  }
  loadUserData(): void {
   
  }

  openModal() {
    this.loginmodal.nativeElement.style.display = 'block';
    console.log('Intentando entrar al modal login');
  }

  closeModal() {
    this.loginmodal.nativeElement.style.display = 'none';
  }

  onVerificar() {
    this.loguin.markAllAsTouched();
    
    if (this.loguin.valid) {
      this.authService.login(this.loguin.value.user, this.loguin.value.password)
        .pipe(
          tap((resp: any) => {
            if (!resp?.empty) {
              Swal.fire({
                title: 'BIENVENIDO',
                text: `${resp.usuario.nombresCompletos}`,
                icon: 'success',
                confirmButtonText: 'Aceptar'
              }).then(() => {
                this.router.navigate(['/home']).then(() => {
                  window.location.reload();
                });
              });
            } else {
              console.log('La respuesta está vacía o no existe.');
              Swal.fire({
                title: 'Error',
                text: 'Usuario o contraseña incorrectos',
                icon: 'error',
                confirmButtonText: 'Aceptar'
              });
            }
          }),
          catchError((error) => {
            if (error.status === 403) {
              Swal.fire({
                title: 'Error',
                text: 'Usuario o contraseña incorrectos',
                icon: 'error',
                confirmButtonText: 'Aceptar'
              });
            } else {
        
              Swal.fire({
                title: 'Error',
                text: 'Ocurrió un problema. Por favor, inténtelo de nuevo.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
              });
            }
            return throwError(error); 
          })
        )
        .subscribe();
    } else {
      Swal.fire({
        title: 'Error',
        text: 'Complete todos los campos',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  }
}