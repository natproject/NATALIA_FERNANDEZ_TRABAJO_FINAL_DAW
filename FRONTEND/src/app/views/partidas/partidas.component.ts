import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { HttpClient } from '@angular/common/http';
import { Partidas, PerfilUsuario, SolicitudesPartidas } from 'src/app/interfaces/response';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-partidas',
  templateUrl: './partidas.component.html',
  styleUrls: ['./partidas.component.css']
})
export class PartidasComponent {
  p: number = 1;
  partidas: Partidas[] = []
  public perfilUsuario: PerfilUsuario[] = [];
  public solicitudesPartidasEnviadas: SolicitudesPartidas[] = [];

  constructor(private router: Router, private DataService: DataService, private http: HttpClient) { }


  ngOnInit() {
    if (!localStorage.getItem('token')) {
      this.router.navigate(['/login']);
    } else {
      const currentPage = localStorage.getItem('currentPage');
      if (currentPage) {
        this.p = parseInt(currentPage, 10);
      }
      this.DataService.getPartidas().subscribe({
        next: response => {
          this.partidas = this.partidas.concat(response);
          for (let i = 0; i < this.partidas.length; i++) {
            let fecha = new Date(this.partidas[i].fecha);
            let formattedFecha = formatDate(fecha, 'dd-MM-yyyy', 'en-US');
            this.partidas[i].fecha = formattedFecha;
          }
          let valor = localStorage.getItem('perfilUsuario');
          if (valor !== null) {
            const parsedValue = JSON.parse(valor) as PerfilUsuario;
            this.perfilUsuario.push(parsedValue);
            this.calcular(this.partidas, this.perfilUsuario)
          }
        },
        error: error => {
          console.log(error);
        }
      });
      this.DataService.getSolicitudesPartidasEnviadas().subscribe({
        next: response => {
          this.solicitudesPartidasEnviadas = this.solicitudesPartidasEnviadas.concat(response);
        },
        error: error => {
          console.log(error);
        }
      });
    }
  }

  calcular(partidas: Partidas[], user: PerfilUsuario[]) {
    for (let i = 0; i < partidas.length; i++) {
      if (user[0].id == partidas[i].master.id) {
        partidas[i].esMaster = true;
      } else {
        partidas[i].esMaster = false;
        const encontrado = this.partidas[i].jugadores.some(objeto => objeto.id === user[0].id);
        if (encontrado) {
          this.partidas[i].esJugador = true;
        } else {
          this.partidas[i].esJugador = false;
        }
      }
    }
  }

  existeSolicitud(id: number): boolean {
    if (this.solicitudesPartidasEnviadas.find(partida => partida.partida.id === id)) {
      return true
    }
    return false
  }


  cancelarSolicitud(id: number) {
    localStorage.setItem('currentPage', this.p.toString());
    const solicitudEncontrada = this.solicitudesPartidasEnviadas.find(partida => partida.partida.id === id);
    if (solicitudEncontrada) {
      const solicitudId = solicitudEncontrada.id;
      console.log(solicitudId)
      this.DataService.delPartidaRevisada(solicitudId).subscribe({
        next: () => {
          window.location.reload();
        },
        error: error => {
          console.error(error);
        }
      });
    }
  }

  enviarSolicitud(id: number) {
    localStorage.setItem('currentPage', this.p.toString());
    const data = {
      jugador_solicitante: this.perfilUsuario[0].id,
      partida: id,
      fecha_creacion: Date.now(),
      aceptada: false
    };
    const json = JSON.stringify(data);
    this.DataService.postEnviarSolicitudCampanya(json).subscribe({
      next: () => {
        window.location.reload();
      },
      error: error => {
        console.error(error);
      }
    });
  }
}
