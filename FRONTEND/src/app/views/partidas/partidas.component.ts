import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { HttpClient } from '@angular/common/http';
import { Partidas } from 'src/app/interfaces/response';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-partidas',
  templateUrl: './partidas.component.html',
  styleUrls: ['./partidas.component.css']
})
export class PartidasComponent {
  p: number = 1;
  partidas: Partidas[] = []
  horas: number = 0
  constructor(private router: Router, private DataService: DataService, private http: HttpClient) { }


  ngOnInit() {
    if (!localStorage.getItem('token')) {
      this.router.navigate(['/login']);
    } else {
      this.DataService.getPartidas().subscribe({
        next: response => {
          this.partidas = this.partidas.concat(response);
          for (let i = 0; i < this.partidas.length; i++) {
            let fecha = new Date(this.partidas[i].fecha);
            let formattedFecha = formatDate(fecha, 'dd-MM-yyyy', 'en-US');
            this.partidas[i].fecha = formattedFecha;
          }
        },
        error: error => {
          console.log(error);
        }
      });
    }
    
  }
}
