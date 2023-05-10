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

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'partidas', component: PartidasComponent },
  { path: 'campanyas', component: CampanyasComponent },
  { path: 'buscar', component: BuscarJuegosComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
