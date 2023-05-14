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


const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'perfil', component: ProfileComponent },
  { path: 'partidas', component: PartidasComponent },
  { path: 'campanyas', component: CampanyasComponent },
  { path: 'buscar', component: BuscarJuegosComponent },
  { path: 'solicitudes_enviadas', component: SolicitudesEnviadasComponent },
  { path: 'detalle_partida/:id', component: DetallePartidaComponent },
  { path: 'detalle_campanya/:id', component: DetalleCampanyaComponent },
  { path: 'usuario/:id', component: UsuarioComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
