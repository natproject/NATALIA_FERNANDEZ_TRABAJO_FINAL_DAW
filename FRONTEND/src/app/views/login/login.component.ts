import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public datosFormulario = {
    username: '',
    password: ''
  };
  public wrongCredentials = false;
  constructor(private DataService: DataService, private router: Router) { }

  enviarDatosLogin(formulario: NgForm): void {
    this.DataService.getResponseLogin(this.datosFormulario).subscribe({
      next: response => {
      this.wrongCredentials = false;
      localStorage.setItem('token', response.token)
      this.goHome()
      },
      error: error => {
        this.wrongCredentials = true;
      }   
    });
  }

  public goHome(){
      if (localStorage.getItem('token')) {
        this.router.navigate(['/home']);
      }else{
        this.router.navigate(['/login']);
      }
  }
}