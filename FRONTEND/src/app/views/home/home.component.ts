import { Component } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { HttpClient } from '@angular/common/http';
import { SolicitudesCampanyas } from 'src/app/interfaces/response';
import { SolicitudesPartidas } from 'src/app/interfaces/response';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  public token = localStorage.getItem('token');
  public username = "";
  public showBellSolicitud = false;
  public solicitudesPartidasEnviadas: SolicitudesPartidas[] = [];
  public solicitudesCampanyasEnviadas: SolicitudesCampanyas[] = [];
  public solicitudesCampanyasEnviadasTotal: number = 0;
  public solicitudesPartidasEnviadasTotal: number = 0;
  public totalSolicitudesEnviadas: number = 0;
  /*public solicitudesCampanyasAceptadas: SolicitudesCampanyas[] = [];
  public solicitudesPartidasAceptadas: SolicitudesPartidas[] = [];*/

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin]
  };
  constructor(private router: Router, private DataService: DataService, private http: HttpClient) { }

  ngOnInit() {
    if (!localStorage.getItem('token')) {
      this.router.navigate(['/login']);
    } else {
      this.DataService.getResponsePerfil().subscribe({
        next: response => {
          console.log(response)
          this.username = response.username;
          localStorage.setItem('perfilUsuario', JSON.stringify(response));
        },
        error: error => {
          console.log(error);
        }
      });
    }

    this.DataService.getSolicitudesCampanyasEnviadas().subscribe({
      next: response => {
        this.solicitudesCampanyasEnviadasTotal = Object.keys(response).length;
        this.solicitudesCampanyasEnviadas = this.solicitudesCampanyasEnviadas.concat(response);
        for (let i = 0; i < this.solicitudesCampanyasEnviadas.length; i++) {
          if (this.solicitudesCampanyasEnviadas[i].aceptada == true) {
            this.showBellSolicitud = true;
          }
        }
      },
      error: error => {
        console.log(error);
      }
    });

    this.DataService.getSolicitudesPartidasEnviadas().subscribe({
      next: response => {
        this.solicitudesPartidasEnviadasTotal = Object.keys(response).length;
        this.solicitudesPartidasEnviadas = this.solicitudesPartidasEnviadas.concat(response);
        for (let i = 0; i < this.solicitudesPartidasEnviadas.length; i++) {
          if (this.solicitudesPartidasEnviadas[i].aceptada == true) {
            this.showBellSolicitud = true;
          }
        }
      },
      error: error => {
        console.log(error);
      }
    });



  }

}


