import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { HttpClient } from '@angular/common/http';
import { PartidaDetalle, PerfilUsuario, Provincias } from 'src/app/interfaces/response';
import { formatDate } from '@angular/common';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-form-editar-partida',
  templateUrl: './form-editar-partida.component.html',
  styleUrls: ['./form-editar-partida.component.css']
})

export class FormEditarPartidaComponent {
  public plataformaHidden: boolean = true;
  public direccionHidden: boolean = true;
  public provinciaHidden: boolean = true;
  public id: number = 0;
  public partida: PartidaDetalle[] = [];
  public perfilUsuario: PerfilUsuario[] = [];
  public provincias: Provincias[] = [];
  public image: string | Blob = ''
  public datosFormulario = {
    master: '',
    nombre_juego: '',
    image: File,
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

  constructor(private router: Router, private DataService: DataService, private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit(): void {
    if (!localStorage.getItem('token')) {
      this.router.navigate(['/login']);
    } else {
      this.route.params.subscribe(params => {
        this.id = params['id'];
      });
      this.DataService.getPartidaDetail(this.id).subscribe({
        next: response => {
          this.partida = this.partida.concat(response);
          let fecha = new Date(this.partida[0].fecha);
          let formattedFecha = formatDate(fecha, 'dd-MM-yyyy', 'en-US');
          this.partida[0].fecha = formattedFecha;
          console.log(this.partida[0].jugadores[0].username)
        },
        error: error => {
          if (error.status === 401) {
            this.router.navigate(['/error']);
            localStorage.clear();
          }
        }
      });
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
          if (error.status === 401) {
            this.router.navigate(['/error']);
            localStorage.clear();
          }
        }
      });
    }
  }

  onImageSelected(event: any): void {
    console.log(event.target.files)
    const imagenInput = event.target.files[0];
    this.image = imagenInput;
  }

  enviarDatos(formulario: NgForm): void {
    const horaInicio = formulario.value.hora_inicio;
    const horaFin = formulario.value.hora_fin;
    const fechaFormateada = formulario.value['fecha'] !== null && formulario.value['fecha'] !== '' ? formatDate(formulario.value['fecha'], 'yyyy-MM-dd', 'en') : formatDate(this.partida[0].fecha, 'yyyy-MM-dd', 'en');
    const datosFormulario = new FormData();
    console.log(formulario.value['image'])
    if (!this.image) {
      datosFormulario.append('master', this.perfilUsuario[0].id.toString());
      datosFormulario.append('nombre_juego', formulario.value['nombre_juego'] || this.partida[0].nombre_juego);
      datosFormulario.append('modalidad', formulario.value['modalidad'] || this.partida[0].modalidad);
      datosFormulario.append('lugar', formulario.value['lugar'] || this.partida[0].lugar);
      datosFormulario.append('provincia', formulario.value['provincia'] || this.partida[0].provincia);
      datosFormulario.append('fecha', fechaFormateada);
      datosFormulario.append('hora_inicio', horaInicio || this.partida[0].hora_inicio);
      datosFormulario.append('hora_fin', horaFin || this.partida[0].hora_fin);
      datosFormulario.append('nivel_jugador', formulario.value['nivel_jugador'] || this.partida[0].nivel_jugador);
      datosFormulario.append('max_usuarios', formulario.value['max_usuarios'] || this.partida[0].max_usuarios);
      datosFormulario.append('requisitos_jugador', formulario.value['requisitos_jugador'] || this.partida[0].requisitos_jugador);
      datosFormulario.append('observaciones', formulario.value['observaciones'] || this.partida[0].observaciones);
      datosFormulario.append('resumen', formulario.value['resumen'] || this.partida[0].resumen);
    } else {
      datosFormulario.append('master', this.perfilUsuario[0].id.toString());
      datosFormulario.append('nombre_juego', formulario.value['nombre_juego'] || this.partida[0].nombre_juego);
      datosFormulario.append('modalidad', formulario.value['modalidad'] || this.partida[0].modalidad);
      datosFormulario.append('lugar', formulario.value['lugar'] || this.partida[0].lugar);
      datosFormulario.append('provincia', formulario.value['provincia'] || this.partida[0].provincia);
      datosFormulario.append('fecha', fechaFormateada);
      datosFormulario.append('hora_inicio', horaInicio || this.partida[0].hora_inicio);
      datosFormulario.append('hora_fin', horaFin || this.partida[0].hora_fin);
      datosFormulario.append('nivel_jugador', formulario.value['nivel_jugador'] || this.partida[0].nivel_jugador);
      datosFormulario.append('max_usuarios', formulario.value['max_usuarios'] || this.partida[0].max_usuarios);
      datosFormulario.append('requisitos_jugador', formulario.value['requisitos_jugador'] || this.partida[0].requisitos_jugador);
      datosFormulario.append('observaciones', formulario.value['observaciones'] || this.partida[0].observaciones);
      datosFormulario.append('resumen', formulario.value['resumen'] || this.partida[0].resumen);
      datosFormulario.append('image', this.image);
    }
    this.DataService.putEditarPartida(this.partida[0].id, datosFormulario).subscribe({
      next: response => {
        this.router.navigate(['/detalle_partida/' + this.partida[0].id]);
      },
      error: error => {
        console.log(error);
        if (error.status === 401) {
          this.router.navigate(['/error']);
          localStorage.clear();
        }
      }
    });
  }


  onModalidadSelected(): void {
    this.direccionHidden = true;
    this.provinciaHidden = true;
    this.plataformaHidden = true;
    const modalidadSeleccionada = this.datosFormulario.modalidad;
    if (modalidadSeleccionada === "online") {
      this.plataformaHidden = false;
    } else {
      this.direccionHidden = false;
      this.provinciaHidden = false;
    }
  }

  eliminarPartida(id: number) {
    this.DataService.delPartida(id).subscribe({
      next: () => {
        alert('PARTIDA ELIMINADA CORRECTAMENTE');
        this.router.navigate(['/mis_juegos']);
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
