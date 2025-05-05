import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { ModalComponent } from './modal/modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthService } from 'src/services/auth.service';
import { LoginComponent } from './login/login.component';
import { RecomendadosComponent } from './recomendados/recomendados.component';
import { RegistrarComponent } from './registrar/registrar.component';
import { NewLocalComponent } from './new-local/new-local.component';
import { AdminpanelComponent } from './adminpanel/adminpanel.component';
import { SolicitudModalComponent } from './solicitud-modal/solicitud-modal.component';
import { AdminComponent } from './admin/admin.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { LocalesmatenimeintoComponent } from './localesmatenimeinto/localesmatenimeinto.component';
import { UsuariospanelComponent } from './usuariospanel/usuariospanel.component';
import { AuthInterceptor } from './AuthInterceptor';
import { Home2Component } from './home2/home2.component';
import { CargaComponent } from './carga/carga.component'
import { LoadingInterceptor } from './LoadingInterceptor';
import { RecomendacionesComponent } from './recomendaciones/recomendaciones.component';
import { LocalComponent } from './local/local.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    ModalComponent,
    LoginComponent,
    RecomendadosComponent,
    RegistrarComponent,
    NewLocalComponent,
    AdminpanelComponent,
    SolicitudModalComponent,
    AdminComponent,
    CategoriasComponent,
    LocalesmatenimeintoComponent,
    UsuariospanelComponent,
    Home2Component,
    CargaComponent,
    RecomendacionesComponent,
    LocalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
