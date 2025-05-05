import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import {RegistrarComponent} from "./registrar/registrar.component";
import { RecomendadosComponent } from './recomendados/recomendados.component';
import { NewLocalComponent } from './new-local/new-local.component';
import { AuthGuard } from './auth.guard';
import { AdminpanelComponent } from './adminpanel/adminpanel.component';
import { AdminGuard } from './admin.guard';
import { AdminComponent } from './admin/admin.component';
import { Home2Component } from './home2/home2.component';
import { LocalComponent } from './local/local.component';



const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: "full"},
	{path: 'home', component: HomeComponent},
  {path: 'home2', component: Home2Component},
  {path: 'registrar', component: RegistrarComponent},
  {path: 'recomendados', component: RecomendadosComponent},
  {path: 'registrarlocal', component: NewLocalComponent, canActivate: [AuthGuard] }, 
  {path: 'admin', component: AdminComponent,canActivate: [AdminGuard] },
  {path: 'login', component: LoginComponent },
  {path: 'local', component:LocalComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
