import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  public datosFormulario = {
    username: '',
    email: '',
    password: ''
  };
  public registerForm = true;
  public error = false;
  public errorMessage = "";
  constructor(private DataService: DataService, private router: Router) { }

  enviarDatosRegister(formulario: NgForm): void {
    this.DataService.getResponseRegister(this.datosFormulario).subscribe({
      next: response => {
        this.registerForm = false;
        localStorage.setItem('token', response.token)
      },
      error: error => {
        this.error = true;
        if (error.error.error === 'Username already exists') {
          this.errorMessage = 'Este nombre de usuario ya existe. Alguien te adelantó en la creación de su personaje.';
        } else if (error.error.error === 'Email already exists') {
          this.errorMessage = 'Este email ya está en uso. Alguien te adelantó en la creación de su personaje.';
        } else {
          this.errorMessage = '¡Oops! Has pifiado. Vuelve a tirar el dado y asegúrate de introducir los datos correctamente.';
        }
      }
    });
  }

}


