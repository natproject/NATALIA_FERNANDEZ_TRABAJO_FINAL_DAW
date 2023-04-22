import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

import { LoginResponse } from '../interfaces/response';
import { PerfilUsuario } from '../interfaces/response';
import { Perfil} from '../interfaces/response';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(public http: HttpClient) { }

  public urlLogin: string = "http://127.0.0.1:8000/api_generate_token/"
  public urlRegister: string = "http://127.0.0.1:8000/api_register/"
  public urlPerfilUsuario: string = "http://127.0.0.1:8000/api_user_personal/"

  public getResponseLogin(datosFormulario: any): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.urlLogin, datosFormulario);
  }

  public getResponseRegister(datosFormulario: any): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.urlRegister, datosFormulario);
  }

  public getResponsePerfil(): Observable<PerfilUsuario> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Token ${localStorage.getItem('token')}`
      })
    };
    return this.http.get<PerfilUsuario>(this.urlPerfilUsuario, httpOptions);
  }
}