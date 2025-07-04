import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { SolicitudesService } from 'src/services/solicitudes';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-local',
  templateUrl: './new-local.component.html',
  styleUrls: ['./new-local.component.css']
})
export class NewLocalComponent implements OnInit {
  localForm!: FormGroup;
  selectedFiles: File[] = [];
  selectedPdf: File | null = null;
  categorias: any[] = [];
  isLoading = false;

  constructor(private fb: FormBuilder, private solicitudesService: SolicitudesService, private router: Router) { }

  ngOnInit() {
    this.solicitudesService.getTipos().subscribe(
      response => {
        this.categorias = response;
      },
      error => {
        console.error('Error al obtener las categorías:', error);
      }
    );

    this.localForm = this.fb.group({
      idUsuario: [localStorage.getItem('idUsuario')],
      nombreLocal: ['', Validators.required],
      telefono: ['', Validators.required],
      horaApertura: ['', Validators.required],
      horaCierre: ['', Validators.required],
      idCategoria: ['', Validators.required], 
      ubicacion: ['', Validators.required],
      descripcion: [''],
      linkFacebook: [''],
      linkInstagram: [''],
      linkMaps: [''],
      ruc: ['', Validators.required]
    });
  }

  onFileChange(event: any) {
    const files = event.target.files;
    if (files.length > 5) {
      alert('You can upload a maximum of 5 images.');
      event.target.value = ''; 
    } else {
      this.selectedFiles = Array.from(files);
    }
  }

  onFileChange2(event: any) {
    const files = event.target.files;
    if (files.length > 1) {
      alert('You can upload only one PDF file.');
      event.target.value = ''; 
    } else {
      const file = files[0];
      if (file.type === 'application/pdf') {
        this.selectedPdf = file;
      } else {
        alert('Only PDF files are allowed.');
        event.target.value = ''; 
      }
    }
  }

  onSubmit(): void {
    this.isLoading = true;
    const formData = new FormData();
    const formValue = this.localForm.value;
    const idUsuario = localStorage.getItem('idUsuario');


    Object.keys(formValue).forEach(key => {
      formData.append(key, formValue[key]);
    });
    


    this.selectedFiles.forEach(file => {
      if (file.type.startsWith('image/')) {
        formData.append('imagenes', file);
      }
    });

    if (this.selectedPdf && this.selectedPdf.type.startsWith('application/pdf')) {
      formData.append('fichaRuc', this.selectedPdf);
    }

    
    this.solicitudesService.grabarSolicitud(formData).subscribe(
      response => {
        this.isLoading = false;
        Swal.fire({
          icon: 'success',
          title: '¡Registro exitoso!',
          text: 'El local se ha registrado correctamente.',
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/home']);
          }
        });
      },
      error => {
        this.isLoading = false;
        Swal.fire({
          icon: 'error',
          title: '¡Error!',
          text: 'Hubo un problema al registrar el local. Intenta nuevamente.',
          confirmButtonText: 'OK'
        });
      }
    );
  }
}