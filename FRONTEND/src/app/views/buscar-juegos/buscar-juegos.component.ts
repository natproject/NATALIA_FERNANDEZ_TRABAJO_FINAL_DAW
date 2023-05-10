import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buscar-juegos',
  templateUrl: './buscar-juegos.component.html',
  styleUrls: ['./buscar-juegos.component.css']
})
export class BuscarJuegosComponent {
  constructor(private DataService: DataService, private router: Router) { }

  public verPartidas() {
    if (localStorage.getItem('token')) {
      this.router.navigate(['/partidas']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  public verCampanyas() {
    if (localStorage.getItem('token')) {
      this.router.navigate(['/campanyas']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
