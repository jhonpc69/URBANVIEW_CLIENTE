import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loguin = new FormGroup({
    user: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });
  code = new FormControl('', [Validators.required, Validators.pattern(/^\d{6}$/)]);
  codeSent = false;
  busy = false;
  error = '';

  constructor(private authService: AuthService, private router: Router) {}

  onVerificar() {
    this.loguin.markAllAsTouched();
    if (this.busy || this.loguin.invalid || (this.codeSent && this.code.invalid)) return;
    const {user, password} = this.loguin.getRawValue();
    this.busy = true;
    this.error = '';
    if (!this.codeSent) {
      this.authService.login(user!, password!).pipe(finalize(() => this.busy = false)).subscribe({
        next: () => this.codeSent = true,
        error: error => this.showError(error)
      });
    } else {
      this.authService.verifyCode(user!, password!, this.code.value!).pipe(finalize(() => this.busy = false)).subscribe({
        next: () => this.router.navigate(['/home']).then(() => window.location.reload()),
        error: error => this.showError(error)
      });
    }
  }

  requestNewCode() {
    this.codeSent = false;
    this.code.reset();
    this.error = '';
  }

  private showError(error: {status: number}) {
    this.error = error.status === 400 ? 'El código es incorrecto o ha expirado. Solicita uno nuevo.'
      : error.status === 401 || error.status === 403 ? 'Correo o contraseña incorrectos.'
      : 'No se pudo ingresar. Revisa la conexión y vuelve a intentarlo.';
  }
}
