import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { HttpClient } from '@angular/common/http';
import { CampanyasRecibidas } from 'src/app/interfaces/response';
import { PartidasRecibidas } from 'src/app/interfaces/response';
import { ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-solicitudes-recibidas',
  templateUrl: './solicitudes-recibidas.component.html',
  styleUrls: ['./solicitudes-recibidas.component.css']
})

export class SolicitudesRecibidasComponent {
  public token = localStorage.getItem('token');
  public solicitudesPartidasRecibidas: PartidasRecibidas[] = [];
  public solicitudesCampanyasRecibidas: CampanyasRecibidas[] = [];
  public showAviso: boolean = false;
  public showSolicitudesAceptadas: boolean = false;
  public hiddenCampanya: boolean = false;
  public hiddenPartida: boolean = false;
  public partida = true;
  public campanya = false;
  public hideButtonAceptarPartida: boolean = false

  constructor(private router: Router, private DataService: DataService, private http: HttpClient) {
  }

  @ViewChild('myButton', { static: false }) myButton: ElementRef = new ElementRef(null);

  @ViewChild('myButton2', { static: false }) myButton2: ElementRef = new ElementRef(null);

  ngOnInit() {
    if (!localStorage.getItem('token')) {
      this.router.navigate(['/login']);
    } else {
      this.DataService.getSolicitudesPartidasRecibidas().subscribe({
        next: response => {
          this.solicitudesPartidasRecibidas = this.solicitudesPartidasRecibidas.concat(response);
        },
        error: error => {
          if (error.status === 401) {
            this.router.navigate(['/error']);
            localStorage.clear();
          }
        }
      });

      this.DataService.getSolicitudesCampanyasRecibidas().subscribe({
        next: response => {
          this.solicitudesCampanyasRecibidas = this.solicitudesCampanyasRecibidas.concat(response);
        },
        error: error => {
          if (error.status === 401) {
            this.router.navigate(['/error']);
            localStorage.clear();
          }
        }
      });
    }
  }

  aceptarSolicitud(id: number, jugador: number, partida: number, fecha: Date, aceptada: boolean) {
    if (aceptada === false) {
      const body = {
        jugador_solicitante: jugador.toString(),
        partida: partida.toString(),
        fecha_creacion: partida.toString(),
        aceptada: true
      };
      this.DataService.putAceptarSolicitudPartida(id, JSON.stringify(body)).subscribe({
        next: () => {
          console.log('Solicitud aceptada');
          alert("SOLICITUD ACEPTADA")
          window.location.reload();
        },
        error: error => {
          if (error.status === 401) {
            this.router.navigate(['/error']);
            localStorage.clear();
          }
        }
      });
    }
  }

  rechazarSolicitud(id: number) {
    this.DataService.delPartidaRevisada(id).subscribe({
      next: () => {
        console.log('Partida eliminada');
        alert("SOLICITUD RECHAZADA")
        window.location.reload();
      },
      error: error => {
        if (error.status === 401) {
          this.router.navigate(['/error']);
          localStorage.clear();
        }
      }
    });
  }

  aceptarSolicitudCampanya(id: number, jugador: number, campanya: number, fecha: Date, aceptada: boolean) {
    if (aceptada === false) {
      const body = {
        jugador_solicitante: jugador.toString(),
        campanya: campanya.toString(),
        fecha_creacion: fecha.toString(),
        aceptada: true
      };
      this.DataService.putAceptarSolicitudCampanya(id, JSON.stringify(body)).subscribe({
        next: () => {
          console.log('Solicitud aceptada');
          alert("SOLICITUD ACEPTADA")
          window.location.reload();
        },
        error: error => {
          console.log(error)
          if (error.status === 401) {
            this.router.navigate(['/error']);
            localStorage.clear();
          }
        }
      });
    }
  }

  rechazarSolicitudCampanya(id: number) {
    this.DataService.delCampanyaRevisada(id).subscribe({
      next: () => {
        console.log('Campaña eliminada');
        alert("SOLICITUD RECHAZADA")
        window.location.reload();
      },
      error: error => {
        if (error.status === 401) {
          this.router.navigate(['/error']);
          localStorage.clear();
        }
      }
    });
  }

}
