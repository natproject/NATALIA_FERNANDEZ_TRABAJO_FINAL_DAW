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
        console.log(this.partida)
        },
        error: error => {
          console.log(error);
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
          console.error(error);
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
    console.log(this.image)
    const horaInicio = formulario.value.hora_inicio;
    const horaFin = formulario.value.hora_fin;
      const datosFormulario = new FormData();
      datosFormulario.append('master', this.perfilUsuario[0].id.toString());
      datosFormulario.append('nombre_juego', formulario.value['nombre_juego']);
      datosFormulario.append('modalidad', formulario.value['modalidad']);
      datosFormulario.append('lugar', formulario.value['lugar']);
      datosFormulario.append('provincia', formulario.value['provincia']);
      datosFormulario.append('fecha', formatDate(formulario.value['fecha'], 'yyyy-MM-dd', 'en'));
      datosFormulario.append('hora_inicio', horaInicio);
      datosFormulario.append('hora_fin', horaFin);
      datosFormulario.append('nivel_jugador', formulario.value['nivel_jugador']);
      datosFormulario.append('max_usuarios', formulario.value['max_usuarios']);
      datosFormulario.append('requisitos_jugador', formulario.value['requisitos_jugador']);
      datosFormulario.append('observaciones', formulario.value['observaciones']);
      datosFormulario.append('resumen', formulario.value['resumen']);
      datosFormulario.append('image', this.image );

      this.DataService.postCrearPartida(datosFormulario).subscribe({
        next: response => {
          this.router.navigate(['/detalle_partida/'+response.id]);

        },
        error: error => {
          console.error(error.error)
        }
      });
  }

  
  onModalidadSelected(): void {
    this.direccionHidden = true;
    this.provinciaHidden = true;
    this.plataformaHidden = true;
    const modalidadSeleccionada = this.datosFormulario.modalidad;
    if(modalidadSeleccionada === "online"){
      this.plataformaHidden = false;
    }else{
      this.direccionHidden = false;
      this.provinciaHidden = false;
    }
  }

}