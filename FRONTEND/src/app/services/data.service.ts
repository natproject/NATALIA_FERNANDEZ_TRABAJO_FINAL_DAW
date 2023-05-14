import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

import { LoginResponse } from '../interfaces/response';
import { PerfilUsuario } from '../interfaces/response';
import { Partidas } from '../interfaces/response';
import { Campanyas } from '../interfaces/response';
import { SolicitudesPartidas } from '../interfaces/response';
import { SolicitudesCampanyas } from '../interfaces/response';
import { CampanyaDetalle } from '../interfaces/response';
import { PartidaDetalle } from '../interfaces/response';
import { UserPerfil } from '../interfaces/response';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(public http: HttpClient) { }

  public urlLogin: string = "http://127.0.0.1:8000/api_generate_token/"
  public urlRegister: string = "http://127.0.0.1:8000/api_register/"
  public urlPerfilUsuario: string = "http://127.0.0.1:8000/api_user_personal/"
  public urlLogout: string = "http://127.0.0.1:8000/api_logout/"
  public urlPartidas: string = "http://127.0.0.1:8000/api_partida/"
  public urlCampanyas: string = "http://127.0.0.1:8000/api_campanya/"
  public urlSolicitudesPartidasEnviadas: string = "http://127.0.0.1:8000/api_solicitudes_partidas_enviadas/"
  public urlSolicitudesCampanyasEnviadas: string = "http://127.0.0.1:8000/api_solicitudes_campanyas_enviadas/"
  public urlSolicitudesPartidasRecibidas: string = "http://127.0.0.1:8000/api_solicitudes_partidas_recibidas/"
  public urlCampanyaDetalle: string = 'http://127.0.0.1:8000/api_campanya/'
  public urlPartidaDetalle: string = 'http://127.0.0.1:8000/api_partida/'
  public urlUserPerfil: string = 'http://127.0.0.1:8000/api_user_perfil/'
  public urlSolicitudCampanyaRevisada: string = 'http://127.0.0.1:8000/api_editar_solicitud_campanya/'
  public urlSolicitudPartidaRevisada: string = 'http://127.0.0.1:8000/api_editar_solicitud_partida/'



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

  public getResponseLogout(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Token ${localStorage.getItem('token')}`
      })
    };
    return this.http.get<any>(this.urlLogout, httpOptions);
  }

  public getPartidas(): Observable<Partidas> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Token ${localStorage.getItem('token')}`
      })
    };
    return this.http.get<Partidas>(this.urlPartidas, httpOptions);
  }

  public getCampanyas(): Observable<Campanyas> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Token ${localStorage.getItem('token')}`
      })
    };
    return this.http.get<Campanyas>(this.urlCampanyas, httpOptions);
  }

  public getSolicitudesPartidasEnviadas(): Observable<SolicitudesPartidas> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Token ${localStorage.getItem('token')}`
      })
    };
    return this.http.get<SolicitudesPartidas>(this.urlSolicitudesPartidasEnviadas, httpOptions);
  }

  public getSolicitudesCampanyasEnviadas(): Observable<SolicitudesCampanyas> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Token ${localStorage.getItem('token')}`
      })
    };
    return this.http.get<SolicitudesCampanyas>(this.urlSolicitudesCampanyasEnviadas, httpOptions);
  }

  public getSolicitudesPartidasRecibidas(): Observable<SolicitudesPartidas> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Token ${localStorage.getItem('token')}`
      })
    };
    return this.http.get<SolicitudesPartidas>(this.urlSolicitudesPartidasRecibidas, httpOptions);
  }

  public getCampanyaDetail(id:number): Observable<CampanyaDetalle> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Token ${localStorage.getItem('token')}`
      })
    };
    return this.http.get<CampanyaDetalle>(`${this.urlCampanyaDetalle}${id}`, httpOptions);
  }

  public getPartidaDetail(id:number): Observable<PartidaDetalle> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Token ${localStorage.getItem('token')}`
      })
    };
    return this.http.get<PartidaDetalle>(`${this.urlPartidaDetalle}${id}`, httpOptions);
  }

  public getUserPerfil(id:number): Observable<UserPerfil> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Token ${localStorage.getItem('token')}`
      })
    };
    return this.http.get<UserPerfil>(`${this.urlUserPerfil}${id}`, httpOptions);
  }

  public delCampanyaRevisada(id: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Token ${localStorage.getItem('token')}`
      })
    };
    return this.http.delete<any>(`${this.urlSolicitudCampanyaRevisada}${id}`, httpOptions);
  }

  public delPartidaRevisada(id: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Token ${localStorage.getItem('token')}`
      })
    };
    return this.http.delete<any>(`${this.urlSolicitudPartidaRevisada}${id}`, httpOptions);
  }
}