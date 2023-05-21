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
  master:             Master;
  provincia:          Provincia;
  jugadores:          Jugadores[];
  horas:              number;
  resumen:            string;
  esJugador:          boolean;
  esMaster:           boolean; 
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
  master:             Master;
  provincia:          Provincia;
  jugadores:          Jugadores[];
  horas:              number;
  resumen:            string;
  esJugador:          boolean;
  esMaster:           boolean; 
}

export interface SolicitudesPartidas {
  id:                  number;
  fecha_creacion:      Date;
  aceptada:            boolean;
  jugador_solicitante: number;
  partida:             Partida;
  oculto:              boolean;
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
  oculto:              boolean;
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

export interface PartidaDetalle {
  id:                 number;
  image:              string;
  hora_inicio:        string;
  hora_fin:           string;
  modalidad:          string;
  lugar:              string;
  fecha:              string;
  nombre_juego:       string;
  nivel_jugador:      string;
  requisitos_jugador: string;
  observaciones:      string;
  max_usuarios:       number;
  num_usuarios:       number;
  horas:              string;
  resumen:            string;
  master:             Master;
  provincia:          Provincia;
  jugadores:          Jugadores[];
}

export interface CampanyaDetalle {
  id:                 number;
  image:              string;
  hora_inicio:        string;
  hora_fin:           string;
  jugadores:          Jugadores[];
  provincia:          Provincia;
  modalidad:          string;
  lugar:              string;
  fecha:              string;
  juego_rol:          string;
  nombre_campanya:    string;
  num_partida:        number;
  nivel_jugador:      string;
  requisitos_jugador: string;
  observaciones:      string;
  max_usuarios:       number;
  num_usuarios:       number;
  horas:              string;
  resumen:            string;
  master:             Master;
}

export interface Jugadores {
  id:       number;
  username: string;
}

export interface Provincia {
  id: number;
  nombre: string;
}

export interface Master {
  id: number;
  username: string;
}

export interface UserPerfil {
  id:       number;
  username: string;
  email:    string;
  perfil:   Perfil;
}

export interface Perfil {
  bio:               string;
  fecha_nacimiento:  Date;
  image:             string;
  proximos_juegos:   number;
  juegos_terminados: number;
}

export interface Provincias {
  id:     number;
  nombre: string;
}
