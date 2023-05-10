import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Campanyas } from 'src/app/interfaces/response';
import { DataService } from 'src/app/services/data.service';
import { HttpClient } from '@angular/common/http';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-campanyas',
  templateUrl: './campanyas.component.html',
  styleUrls: ['./campanyas.component.css']
})
export class CampanyasComponent {
  p: number = 1;
  campanyas: Campanyas[] = []
  constructor(private router: Router, private DataService: DataService, private http: HttpClient) { }


  ngOnInit() {
    if (!localStorage.getItem('token')) {
      this.router.navigate(['/login']);
    } else {
      this.DataService.getCampanyas().subscribe({
        next: response => {
          this.campanyas = this.campanyas.concat(response);
          for (let i = 0; i < this.campanyas.length; i++) {
            let fecha = new Date(this.campanyas[i].fecha);
            let formattedFecha = formatDate(fecha, 'dd-MM-yyyy', 'en-US');
            this.campanyas[i].fecha = formattedFecha;
          }
        },
        error: error => {
          console.log(error);
        }
      });
    }

    
  }
}
