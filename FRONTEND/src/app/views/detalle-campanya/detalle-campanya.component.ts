import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { HttpClient } from '@angular/common/http';
import { CampanyaDetalle } from 'src/app/interfaces/response';
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-detalle-campanya',
  templateUrl: './detalle-campanya.component.html',
  styleUrls: ['./detalle-campanya.component.css']
})
export class DetalleCampanyaComponent {
  public id: number = 0;
  public campanya: CampanyaDetalle[] = [];

  constructor(private router: Router, private DataService: DataService, private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit(): void {
    if (!localStorage.getItem('token')) {
      this.router.navigate(['/login']);
    } else {
      this.route.params.subscribe(params => {
        this.id = params['id'];
      });
      this.DataService.getCampanyaDetail(this.id).subscribe({
        next: response => {
        this.campanya = this.campanya.concat(response);
        let fecha = new Date(this.campanya[0].fecha);
        let formattedFecha = formatDate(fecha, 'dd-MM-yyyy', 'en-US');
        this.campanya[0].fecha = formattedFecha;
        console.log(this.campanya)
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
