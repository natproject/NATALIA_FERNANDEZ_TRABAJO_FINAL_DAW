export interface LoginResponse {
  token: string;
}

export interface PerfilUsuario {
  id:       number;
  username: string;
  email:    string;
  perfil:   Perfil;
}

export interface Perfil {
  bio:              string;
  fecha_nacimiento: Date;
  image:            string;
  proximos_juegos:  number;
  juegos_terminados:number;

}

export interface Partidas {
  id:                 number;
  image:              string;
  modalidad:          string;
  lugar:              string;
  fecha:              string;
  hora_inicio:        string;
  hora_fin:           string;
  nombre_juego:       string;
  nivel_jugador:      string;
  requisitos_jugador: string;
  observaciones:      string;
  max_usuarios:       number;
  num_usuarios:       number;
  master:             string;
  provincia:          number;
  jugadores:          number[];
  horas:              number;
  resumen:            string;
}

export interface Campanyas {
  id:                 number;
  image:              string;
  modalidad:          string;
  lugar:              string;
  fecha:              string;
  hora_inicio:        string;
  hora_fin:           string;
  juego_rol:          string;
  nombre_campanya:    string;
  num_partida:        number;
  nivel_jugador:      string;
  requisitos_jugador: string;
  observaciones:      string;
  max_usuarios:       number;
  num_usuarios:       number;
  master:             string;
  provincia:          null;
  jugadores:          number[];
  horas:              number;
  resumen:            string;
}

export interface SolicitudesPartidas {
  id:                  number;
  fecha_creacion:      Date;
  aceptada:            boolean;
  jugador_solicitante: number;
  partida:             Partida;
}

export interface Partida {
  id:            number;
  nombre_juego:  string;
  master:        Master;
  nivel_jugador: string;
  modalidad:     string;
  fecha:         Date;
}

export interface SolicitudesCampanyas {
  id:                  number;
  fecha_creacion:      Date;
  aceptada:            boolean;
  jugador_solicitante: number;
  campanya:            Campanya;
}

export interface Campanya {
  id:              number;
  juego_rol:       string;
  nombre_campanya: string;
  master:          Master;
  num_partida:     number;
  nivel_jugador:   string;
  modalidad:       string;
  fecha:           Date;
}

export interface Master {
  username: string;
}
