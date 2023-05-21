import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Campanyas, PerfilUsuario, SolicitudesCampanyas } from 'src/app/interfaces/response';
import { DataService } from 'src/app/services/data.service';
import { HttpClient } from '@angular/common/http';
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-campanyas',
  templateUrl: './campanyas.component.html',
  styleUrls: ['./campanyas.component.css']
})
export class CampanyasComponent {
  public p: number = 1;
  public campanyas: Campanyas[] = []
  public perfilUsuario: PerfilUsuario[] = [];
  public solicitudesCampanyasEnviadas: SolicitudesCampanyas[] = [];

  constructor(private router: Router, private DataService: DataService, private http: HttpClient) { }

  ngOnInit() {
    if (!localStorage.getItem('token')) {
      this.router.navigate(['/login']);
    } else {
      const currentPage = localStorage.getItem('currentPage');
      if (currentPage) {
        this.p = parseInt(currentPage, 10);
      }
      this.DataService.getCampanyas().subscribe({
        next: response => {
          this.campanyas = this.campanyas.concat(response);
          for (let i = 0; i < this.campanyas.length; i++) {
            let fecha = new Date(this.campanyas[i].fecha);
            let formattedFecha = formatDate(fecha, 'dd-MM-yyyy', 'en-US');
            this.campanyas[i].fecha = formattedFecha;
          }
          let valor = localStorage.getItem('perfilUsuario');
          if (valor !== null) {
            const parsedValue = JSON.parse(valor) as PerfilUsuario;
            this.perfilUsuario.push(parsedValue);
            this.calcular(this.campanyas, this.perfilUsuario)
          }
        },
        error: error => {
          if (error.status === 401) {
            this.router.navigate(['/error']);
            localStorage.clear();
          }
        }
      });
      this.DataService.getSolicitudesCampanyasEnviadas().subscribe({
        next: response => {
          this.solicitudesCampanyasEnviadas = this.solicitudesCampanyasEnviadas.concat(response);
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

  calcular(campanyas: Campanyas[], user: PerfilUsuario[]) {
    for (let i = 0; i < campanyas.length; i++) {
      if (user[0].id == this.campanyas[i].master.id) {
        this.campanyas[i].esMaster = true;
      } else {
        this.campanyas[i].esMaster = false;
        const encontrado = this.campanyas[i].jugadores.some(objeto => objeto.id === user[0].id);
        if (encontrado) {
          this.campanyas[i].esJugador = true;
        } else {
          this.campanyas[i].esJugador = false;
        }
      }
    }
  }

  existeSolicitud(id: number): boolean {
    if (this.solicitudesCampanyasEnviadas.find(campanya => campanya.campanya.id === id)) {
      return true
    }
    return false
  }

  cancelarSolicitud(id: number) {
    localStorage.setItem('currentPage', this.p.toString());
    const solicitudEncontrada = this.solicitudesCampanyasEnviadas.find(campanya => campanya.campanya.id === id);
    if (solicitudEncontrada) {
      const solicitudId = solicitudEncontrada.id;
      console.log(solicitudId)
      this.DataService.delCampanyaRevisada(solicitudId).subscribe({
        next: () => {
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

  enviarSolicitud(id: number) {
    localStorage.setItem('currentPage', this.p.toString());
    const data = {
      jugador_solicitante: this.perfilUsuario[0].id,
      campanya: id,
      fecha_creacion: Date.now(),
      aceptada: false
    };
    const json = JSON.stringify(data);
    this.DataService.postEnviarSolicitudCampanya(json).subscribe({
      next: () => {
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
