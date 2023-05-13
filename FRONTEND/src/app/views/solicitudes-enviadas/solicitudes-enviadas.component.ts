import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { HttpClient } from '@angular/common/http';
import { SolicitudesCampanyas } from 'src/app/interfaces/response';
import { SolicitudesPartidas } from 'src/app/interfaces/response';
import { ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';


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

  constructor(private router: Router, private DataService: DataService, private http: HttpClient, private changeDetector: ChangeDetectorRef) {
    this.solicitudesPartidasAceptadas = [];
    this.solicitudesCampanyasAceptadas = [];
  }

  @ViewChild('myButton', { static: false }) myButton: ElementRef = new ElementRef(null);

  @ViewChild('myButton2', { static: false }) myButton2: ElementRef = new ElementRef(null);

  ngOnInit() {
    if (!localStorage.getItem('token')) {
      this.router.navigate(['/login']);
    } else {
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
        this.solicitudesPartidasAceptadas.push(solicitudes[i])
        this.showAviso = true;
      }
    }
    console.log(this.solicitudesPartidasAceptadas)
    if (this.showAviso) {
      this.show()
    }
  } 
  calcularCampanya(solicitudes: any) {
    for (let i = 0; i < solicitudes.length; i++) {
      if (solicitudes[i].aceptada == true) {
        this.solicitudesCampanyasAceptadas.push(solicitudes[i])
        this.showAviso= true;
      }
    }
    console.log(this.solicitudesCampanyasAceptadas)
    if (this.showAviso) {
      this.show()
    }
  }

  show2() {
    this.myButton2.nativeElement.click();
  }
}
