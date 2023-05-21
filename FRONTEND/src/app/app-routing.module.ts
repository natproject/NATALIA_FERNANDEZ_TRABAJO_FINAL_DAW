import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LandingComponent } from './views/landing/landing.component';
import { LoginComponent } from './views/login/login.component';
import { HomeComponent } from './views/home/home.component';
import { RegisterComponent } from './views/register/register.component';
import { ProfileComponent } from './views/profile/profile.component';
import { PartidasComponent } from './views/partidas/partidas.component';
import { BuscarJuegosComponent } from './views/buscar-juegos/buscar-juegos.component';
import { CampanyasComponent } from './views/campanyas/campanyas.component';
import { SolicitudesEnviadasComponent } from './views/solicitudes-enviadas/solicitudes-enviadas.component';
import { DetallePartidaComponent } from './views/detalle-partida/detalle-partida.component';
import { DetalleCampanyaComponent } from './views/detalle-campanya/detalle-campanya.component';
import { UsuarioComponent } from './views/usuario/usuario.component';
import { CrearJuegosComponent } from './views/crear-juegos/crear-juegos.component';
import { FormCrearPartidaComponent } from './views/form-crear-partida/form-crear-partida.component';
import { FormCrearCampanyaComponent } from './views/form-crear-campanya/form-crear-campanya.component';
import { FormEditarPartidaComponent } from './views/form-editar-partida/form-editar-partida.component';
import { FormEditarCampanyaComponent } from './views/form-editar-campanya/form-editar-campanya.component';
import { ErrorPaginaComponent } from './views/error-pagina/error-pagina.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'perfil', component: ProfileComponent },
  { path: 'partidas', component: PartidasComponent },
  { path: 'campanyas', component: CampanyasComponent },
  { path: 'buscar', component: BuscarJuegosComponent },
  { path: 'mis_juegos', component: CrearJuegosComponent },
  { path: 'solicitudes_enviadas', component: SolicitudesEnviadasComponent },
  { path: 'detalle_partida/:id', component: DetallePartidaComponent },
  { path: 'detalle_campanya/:id', component: DetalleCampanyaComponent },
  { path: 'usuario/:id', component: UsuarioComponent },
  { path: 'crear_partida', component: FormCrearPartidaComponent },
  { path: 'crear_campanya', component: FormCrearCampanyaComponent },
  { path: 'editar_partida/:id', component: FormEditarPartidaComponent },
  { path: 'editar_campanya/:id', component: FormEditarCampanyaComponent },
  { path: 'error', component: ErrorPaginaComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
