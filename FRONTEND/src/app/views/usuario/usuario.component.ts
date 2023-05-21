import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { HttpClient } from '@angular/common/http';
import { PartidaDetalle } from 'src/app/interfaces/response';
import { formatDate } from '@angular/common';
import { UserPerfil } from 'src/app/interfaces/response';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent {
  public id: number = 0;
  public noImage = false;
  public noPerfil = false;
  public user: UserPerfil[] = [];
  public canEdit: boolean = false;

  constructor(private router: Router, private DataService: DataService, private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit(): void {
    if (!localStorage.getItem('token')) {
      this.router.navigate(['/login']);
    } else {
      this.route.params.subscribe(params => {
        this.id = params['id'];
      });
      this.DataService.getUserPerfil(this.id).subscribe({
        next: response => {
          this.user = this.user.concat(response);
          if (this.user[0].perfil.image == null) {
            this.noImage = true;
          }
          let valor = localStorage.getItem('perfilUsuario')
          if (valor !== null) {
            const perfilUsuario = JSON.parse(valor);
            if (perfilUsuario.id == this.user[0].id) {
              this.canEdit = true;
            }
          }
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

}
