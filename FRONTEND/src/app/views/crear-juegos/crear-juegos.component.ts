import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { HttpClient } from '@angular/common/http';
import { Campanyas, Partidas, PerfilUsuario } from 'src/app/interfaces/response';
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-crear-juegos',
  templateUrl: './crear-juegos.component.html',
  styleUrls: ['./crear-juegos.component.css']
})
export class CrearJuegosComponent {
  public misPartidas: Partidas[] = []
  public misCampanyas: Campanyas[] = []
  public perfilUsuario: PerfilUsuario[] = [];


  constructor(private router: Router, private DataService: DataService, private http: HttpClient) { }
  ngOnInit() {
    if (!localStorage.getItem('token')) {
      this.router.navigate(['/login']);
    }else{
      this.DataService.getMisPartidas().subscribe({
        next: response => {
          this.misPartidas = this.misPartidas.concat(response);
          for (let i = 0; i < this.misPartidas.length; i++) {
            let fecha = new Date(this.misPartidas[i].fecha);
            let formattedFecha = formatDate(fecha, 'dd-MM-yyyy', 'en-US');
            this.misPartidas[i].fecha = formattedFecha;
          }
          let valor = localStorage.getItem('perfilUsuario');
          if (valor !== null) {
            const parsedValue = JSON.parse(valor) as PerfilUsuario;
            this.perfilUsuario.push(parsedValue);
            this.calcularPartida(this.misPartidas, this.perfilUsuario)
          }
        },
        error: error => {
          console.log(error);
        }
      });

      this.DataService.getMisCampanyas().subscribe({
        next: response => {
          this.misCampanyas = this.misCampanyas.concat(response);
          for (let i = 0; i < this.misCampanyas.length; i++) {
            let fecha = new Date(this.misCampanyas[i].fecha);
            let formattedFecha = formatDate(fecha, 'dd-MM-yyyy', 'en-US');
            this.misCampanyas[i].fecha = formattedFecha;
          }
          let valor = localStorage.getItem('perfilUsuario');
          if (valor !== null) {
            const parsedValue = JSON.parse(valor) as PerfilUsuario;
            this.perfilUsuario.push(parsedValue);
            this.calcularCampanya(this.misCampanyas, this.perfilUsuario)
          }
        },
        error: error => {
          console.log(error);
        }
      });
    }
  }

  public crearPartidas() {
    this.router.navigate(['/crear_partida']);
  }

  public crearCampanyas() {
    this.router.navigate(['/crear_campanya']);
  }

  calcularPartida(partidas: Partidas[], user: PerfilUsuario[]) {
    for (let i = 0; i < partidas.length; i++) {
      if (user[0].id == partidas[i].master.id) {
        partidas[i].esMaster = true;
      } else {
        partidas[i].esMaster = false;
      }
    }
  }

  calcularCampanya(campanyas: Campanyas[], user: PerfilUsuario[]) {
    for (let i = 0; i < campanyas.length; i++) {
      if (user[0].id == campanyas[i].master.id) {
        campanyas[i].esMaster = true;
      } else {
        campanyas[i].esMaster = false;
      }
    }
  }
}
