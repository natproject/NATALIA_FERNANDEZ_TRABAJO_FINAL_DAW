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
import { Provincias } from '../interfaces/response';
import { PartidasRecibidas } from '../interfaces/response';
import { CampanyasRecibidas } from '../interfaces/response';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(public http: HttpClient) { }

  public urlLogin: string = "http://127.0.0.1:8000/api_generate_token/";
  public urlRegister: string = "http://127.0.0.1:8000/api_register/";
  public urlPerfilUsuario: string = "http://127.0.0.1:8000/api_user_personal/";
  public urlLogout: string = "http://127.0.0.1:8000/api_logout/"
  public urlPartidas: string = "http://127.0.0.1:8000/api_partida/"
  public urlCampanyas: string = "http://127.0.0.1:8000/api_campanya/";
  public urlSolicitudesPartidasEnviadas: string = "http://127.0.0.1:8000/api_solicitudes_partidas_enviadas/";
  public urlSolicitudesCampanyasEnviadas: string = "http://127.0.0.1:8000/api_solicitudes_campanyas_enviadas/";
  public urlSolicitudesPartidasRecibidas: string = "http://127.0.0.1:8000/api_solicitudes_partidas_recibidas/";
  public urlCampanyaDetalle: string = 'http://127.0.0.1:8000/api_campanya/';
  public urlPartidaDetalle: string = 'http://127.0.0.1:8000/api_partida/';
  public urlUserPerfil: string = 'http://127.0.0.1:8000/api_user_perfil/';
  public urlSolicitudCampanyaRevisada: string = 'http://127.0.0.1:8000/api_editar_solicitud_campanya/';
  public urlSolicitudPartidaRevisada: string = 'http://127.0.0.1:8000/api_editar_solicitud_partida/';
  public urlEnviarSolicitudCampanya: string = "http://127.0.0.1:8000/api_solicitudes_campanyas/";
  public urlEnviarSolicitudPartida: string = "http://127.0.0.1:8000/api_solicitudes_partidas/"
  public urlMisPartidas: string = "http://127.0.0.1:8000/api_mis_partidas/";
  public urlMisCampanyas: string = "http://127.0.0.1:8000/api_mis_campanyas/";
  public urlProvincias: string = "http://127.0.0.1:8000/api_provincias/";
  public urlEliminarPartida: string = "http://127.0.0.1:8000/api_partida/";
  public urlEliminarCampanya: string = "http://127.0.0.1:8000/api_campanya/";
  public urlSolicitudesCampanyasRecibidas: string = "http://127.0.0.1:8000/api_solicitudes_campanyas_recibidas/";
  public urlAceptarSolicitudPartida: string = "http://127.0.0.1:8000/api_editar_solicitud_partida/";
  public urlAceptarSolicitudCampanya: string = "http://127.0.0.1:8000/api_editar_solicitud_campanya/";
  public urlEditarPartida: string = "http://127.0.0.1:8000/api_partida/"
  public urlEditarCampanya: string = "http://127.0.0.1:8000/api_campanya/"
  public urlAbandonarPartida: string = "http://127.0.0.1:8000/api_eliminar_usuario_partida/"
  public urlAbandonarCampanya: string = "http://127.0.0.1:8000/api_eliminar_usuario_campanya/"


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

  public getCampanyaDetail(id: number): Observable<CampanyaDetalle> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Token ${localStorage.getItem('token')}`
      })
    };
    return this.http.get<CampanyaDetalle>(`${this.urlCampanyaDetalle}${id}`, httpOptions);
  }

  public getPartidaDetail(id: number): Observable<PartidaDetalle> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Token ${localStorage.getItem('token')}`
      })
    };
    return this.http.get<PartidaDetalle>(`${this.urlPartidaDetalle}${id}`, httpOptions);
  }

  public getUserPerfil(id: number): Observable<UserPerfil> {
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

  public postEnviarSolicitudCampanya(body: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Token ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<any>(this.urlEnviarSolicitudCampanya, body, httpOptions);
  }

  public postEnviarSolicitudPartida(body: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Token ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<any>(this.urlEnviarSolicitudPartida, body, httpOptions);
  }

  public getMisPartidas(): Observable<Partidas> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Token ${localStorage.getItem('token')}`
      })
    };
    return this.http.get<Partidas>(this.urlMisPartidas, httpOptions);
  }

  public getMisCampanyas(): Observable<Campanyas> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Token ${localStorage.getItem('token')}`
      })
    };
    return this.http.get<Campanyas>(this.urlMisCampanyas, httpOptions);
  }

  public getProvincias(): Observable<Provincias> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Token ${localStorage.getItem('token')}`
      })
    };
    return this.http.get<Provincias>(this.urlProvincias, httpOptions);
  }

  public postCrearPartida(body: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Token ${localStorage.getItem('token')}`
      })
    };
    return this.http.post<any>(this.urlPartidas, body, httpOptions);
  }

  public postCrearCampanya(body: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Token ${localStorage.getItem('token')}`
      })
    };
    return this.http.post<any>(this.urlCampanyas, body, httpOptions);
  }

  public delPartida(id: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Token ${localStorage.getItem('token')}`
      })
    };
    return this.http.delete<any>(`${this.urlEliminarPartida}${id}`, httpOptions);
  }

  public delCampanya(id: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Token ${localStorage.getItem('token')}`
      })
    };
    return this.http.delete<any>(`${this.urlEliminarCampanya}${id}`, httpOptions);
  }

  public getSolicitudesPartidasRecibidas(): Observable<PartidasRecibidas> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Token ${localStorage.getItem('token')}`
      })
    };
    return this.http.get<PartidasRecibidas>(this.urlSolicitudesPartidasRecibidas, httpOptions);
  }

  public getSolicitudesCampanyasRecibidas(): Observable<CampanyasRecibidas> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Token ${localStorage.getItem('token')}`
      })
    };
    return this.http.get<CampanyasRecibidas>(this.urlSolicitudesCampanyasRecibidas, httpOptions);
  }

  public putAceptarSolicitudPartida(id: number, body: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Token ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      })
    };
    return this.http.put<any>(`${this.urlAceptarSolicitudPartida}${id}/`, body, httpOptions);
  }

  public putAceptarSolicitudCampanya(id: number, body: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Token ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      })
    };
    return this.http.put<any>(`${this.urlAceptarSolicitudCampanya}${id}/`, body, httpOptions);
  }

  public putEditarPartida(id: number, body: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Token ${localStorage.getItem('token')}`
      })
    };
    return this.http.put<any>(`${this.urlEditarPartida}${id}/`, body, httpOptions);
  }

  public putEditarCampanya(id: number, body: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Token ${localStorage.getItem('token')}`
      })
    };
    return this.http.put<any>(`${this.urlEditarCampanya}${id}/`, body, httpOptions);
  }

  public delJugadorPartida(id: number, user: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Token ${localStorage.getItem('token')}`,
      }),
    };
    return this.http.delete<any>(`${this.urlAbandonarPartida}${id}/${user}/`, httpOptions);
  }

  public delJugadorCampanya(id: number, user: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Token ${localStorage.getItem('token')}`,
      }),
    };
    return this.http.delete<any>(`${this.urlAbandonarCampanya}${id}/${user}/`, httpOptions);
  }
}