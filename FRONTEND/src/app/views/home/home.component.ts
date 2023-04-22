import { Component } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  public token = localStorage.getItem('token');
  public username = "";


  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin]
  };
  constructor(private router: Router, private DataService: DataService, private http: HttpClient) { }

  ngOnInit() {
    if (!localStorage.getItem('token')) {
      this.router.navigate(['/login']);
    } else {
      this.DataService.getResponsePerfil().subscribe({
        next: response => {
          this.username = response.username;
          localStorage.setItem('perfilUsuario', JSON.stringify(response));
        },
        error: error => {
          console.log(error);
        }
      });
    }
  }
}


