import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { HttpClient } from '@angular/common/http';
import { Partidas, PerfilUsuario, Provincias, SolicitudesPartidas } from 'src/app/interfaces/response';
import { formatDate } from '@angular/common';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-form-crear-partida',
  templateUrl: './form-crear-partida.component.html',
  styleUrls: ['./form-crear-partida.component.css']
})
export class FormCrearPartidaComponent {
  public selectedModalidad: string = 'online';
  public labelValue: string = 'Plataforma';
  public perfilUsuario: PerfilUsuario[] = [];
  public provincias: Provincias[] = [];
  public fechaActual: number = 0
  public datosFormulario = {
    master: '',
    nombre_juego: '',
    image: '',
    modalidad: '',
    lugar: '',
    provincia: 0,
    fecha: '',
    hora_inicio: '',
    hora_fin: '',
    nivel_jugador: '',
    max_usuarios: 0,
    requisitos_jugador: '',
    observaciones: '',
    resumen: ''
  };

  constructor(private router: Router, private DataService: DataService, private http: HttpClient) {
    this.selectedModalidad = 'online';
    this.labelValue = "Plataforma";
  }

  ngOnInit() {
    if (!localStorage.getItem('token')) {
      this.router.navigate(['/login']);
    } else {
      this.fechaActual =  Date.now();
      let valor = localStorage.getItem('perfilUsuario');
      if (valor !== null) {
        const parsedValue = JSON.parse(valor) as PerfilUsuario;
        this.perfilUsuario.push(parsedValue);
      }
      this.DataService.getProvincias().subscribe({
        next: response => {
          this.provincias = this.provincias.concat(response);
        },
        error: error => {
          console.error(error);
        }
      });
    }
  }

  enviarDatos(formulario: NgForm): void {
    this.DataService.postCrearPartida(this.datosFormulario).subscribe({
      next: response => {
        this.router.navigate(['/']);
      },
      error: error => {
        console.error(error)
      }   
    });
  }


}
