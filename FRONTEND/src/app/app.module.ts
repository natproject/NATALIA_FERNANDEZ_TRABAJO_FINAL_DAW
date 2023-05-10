import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; 
import { ReactiveFormsModule } from '@angular/forms'
import { FullCalendarModule } from '@fullcalendar/angular';
import {NgxPaginationModule} from 'ngx-pagination'; 

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
    BuscarJuegosComponent
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
