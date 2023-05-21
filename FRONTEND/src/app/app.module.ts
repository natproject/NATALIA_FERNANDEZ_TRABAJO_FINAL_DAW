import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'
import { FullCalendarModule } from '@fullcalendar/angular';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderLandingComponent } from './components/header-landing/header-landing.component';
import { LandingComponent } from './views/landing/landing.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './views/login/login.component';
import { HomeComponent } from './views/home/home.component';
import { RegisterComponent } from './views/register/register.component';
import { ProfileComponent } from './views/profile/profile.component';
import { PartidasComponent } from './views/partidas/partidas.component';
import { CampanyasComponent } from './views/campanyas/campanyas.component';
import { BuscarJuegosComponent } from './views/buscar-juegos/buscar-juegos.component';
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
import { SolicitudesRecibidasComponent } from './views/solicitudes-recibidas/solicitudes-recibidas.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderLandingComponent,
    LandingComponent,
    FooterComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    ProfileComponent,
    PartidasComponent,
    CampanyasComponent,
    BuscarJuegosComponent,
    SolicitudesEnviadasComponent,
    DetallePartidaComponent,
    DetalleCampanyaComponent,
    UsuarioComponent,
    CrearJuegosComponent,
    FormCrearPartidaComponent,
    FormCrearCampanyaComponent,
    FormEditarPartidaComponent,
    FormEditarCampanyaComponent,
    ErrorPaginaComponent,
    SolicitudesRecibidasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FullCalendarModule,
    NgxPaginationModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
