import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buscar-juegos',
  templateUrl: './buscar-juegos.component.html',
  styleUrls: ['./buscar-juegos.component.css']
})
export class BuscarJuegosComponent {
  constructor(private router: Router) { }

  ngOnInit() {
    if (!localStorage.getItem('token')) {
      this.router.navigate(['/login']);
    }
  }

  public verPartidas() {
    this.router.navigate(['/partidas']);
  }

  public verCampanyas() {
    this.router.navigate(['/campanyas']);
  }

}
