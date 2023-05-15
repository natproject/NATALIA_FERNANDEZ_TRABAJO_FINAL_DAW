import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { HttpClient } from '@angular/common/http';
import { SolicitudesCampanyas } from 'src/app/interfaces/response';
import { SolicitudesPartidas } from 'src/app/interfaces/response';
import { ViewChild, ElementRef } from '@angular/core';


@Component({
  selector: 'app-solicitudes-enviadas',
  templateUrl: './solicitudes-enviadas.component.html',
  styleUrls: ['./solicitudes-enviadas.component.css']
})
export class SolicitudesEnviadasComponent {
  public token = localStorage.getItem('token');
  public solicitudesPartidasEnviadas: SolicitudesPartidas[] = [];
  public solicitudesCampanyasEnviadas: SolicitudesCampanyas[] = [];
  public showAviso: boolean = false;
  public solicitudesPartidasAceptadas: SolicitudesPartidas[] = [];
  public solicitudesCampanyasAceptadas: SolicitudesCampanyas[] = [];
  public showSolicitudesAceptadas: boolean = false;
  public hiddenCampanya: boolean = false;
  public hiddenPartida: boolean = false;
  public partida = true;
  public campanya = false;



  constructor(private router: Router, private DataService: DataService, private http: HttpClient) {
    this.solicitudesPartidasAceptadas = [];
    this.solicitudesCampanyasAceptadas = [];
  }

  @ViewChild('myButton', { static: false }) myButton: ElementRef = new ElementRef(null);

  @ViewChild('myButton2', { static: false }) myButton2: ElementRef = new ElementRef(null);

  ngOnInit() {
    if (!localStorage.getItem('token')) {
      this.router.navigate(['/login']);
    } else {
      const showPartida = localStorage.getItem('partida');
      if (showPartida !== null) {
        this.partida = showPartida === "true";
        localStorage.removeItem('partida');
      }
      const showCampanya = localStorage.getItem('campanya');
      if (showCampanya !== null) {
        this.campanya = showCampanya === "true";
        localStorage.removeItem('campanya');
      }
      this.DataService.getSolicitudesPartidasEnviadas().subscribe({
        next: response => {
          this.solicitudesPartidasEnviadas = this.solicitudesPartidasEnviadas.concat(response);
          this.calcularPartida(this.solicitudesPartidasEnviadas);
        },
        error: error => {
          console.log(error);
        }
      });

      this.DataService.getSolicitudesCampanyasEnviadas().subscribe({
        next: response => {
          this.solicitudesCampanyasEnviadas = this.solicitudesCampanyasEnviadas.concat(response);
          this.calcularCampanya(this.solicitudesCampanyasEnviadas);
        },
        error: error => {
          console.log(error);
        }
      });
    }
  }

  show() {
    this.myButton.nativeElement.click();
  }

  calcularPartida(solicitudes: any) {
    for (let i = 0; i < solicitudes.length; i++) {
      if (solicitudes[i].aceptada == true) {
        solicitudes[i].oculto = false;
        this.solicitudesPartidasAceptadas.push(solicitudes[i])
        this.showAviso = true;
      }
    }
    if (this.showAviso) {
      this.show()
    }
  }

  calcularCampanya(solicitudes: any) {
    for (let i = 0; i < solicitudes.length; i++) {
      if (solicitudes[i].aceptada == true) {
        solicitudes[i].oculto = false;
        this.solicitudesCampanyasAceptadas.push(solicitudes[i])
        console.log(this.solicitudesCampanyasAceptadas)
        this.showAviso = true;
      }
    }
    if (this.showAviso) {
      this.show()
    }
  }

  show2() {
    this.myButton2.nativeElement.click();
  }

  solicitudPartidaRevisada(id: number, index: number) {
    this.solicitudesPartidasAceptadas[index].oculto = true;
    this.DataService.delPartidaRevisada(id).subscribe({
      next: () => {
        console.log('Partida eliminada');
      },
      error: error => {
        console.error(error);
        this.solicitudesPartidasAceptadas[id].oculto = false;
      }
    });
  }

  solicitudCampanyaRevisada(id: number, index: number) {
    this.solicitudesCampanyasAceptadas[index].oculto = true;
    this.DataService.delCampanyaRevisada(id).subscribe({
      next: () => {
        console.log('Campanya eliminada');
      },
      error: error => {
        console.error(error);
        this.solicitudesCampanyasAceptadas[id].oculto = false;

      }
    });
  }

  cancelarSolicitudCampanya(id: number) {
    this.DataService.delCampanyaRevisada(id).subscribe({
      next: () => {
        localStorage.setItem('campanya', 'true');
        localStorage.setItem('partida', 'false');
        window.location.reload();
      },
      error: error => {
        console.error(error);
      }
    });

  }


}
