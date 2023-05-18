import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { HttpClient } from '@angular/common/http';
import { PartidaDetalle } from 'src/app/interfaces/response';
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-detalle-partida',
  templateUrl: './detalle-partida.component.html',
  styleUrls: ['./detalle-partida.component.css']
})
export class DetallePartidaComponent {
  public id: number = 0;
  public partida: PartidaDetalle[] = [];

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
        console.log(this.partida[0].jugadores)
        console.log(this.partida[0].provincia.nombre)
        },
        error: error => {
          console.log(error);
        }
      });
    }
  }
}
