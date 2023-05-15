import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { HttpClient } from '@angular/common/http';
import { Campanyas, PerfilUsuario, Provincias, SolicitudesCampanyas } from 'src/app/interfaces/response';
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-form-crear-campanya',
  templateUrl: './form-crear-campanya.component.html',
  styleUrls: ['./form-crear-campanya.component.css']
})
export class FormCrearCampanyaComponent {
  selectedModalidad: string = 'online';
  labelValue: string = 'Plataforma';

  public perfilUsuario: PerfilUsuario[] = [];
  public provincias: Provincias[] = [];
  public fechaActual: number = 0

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

}