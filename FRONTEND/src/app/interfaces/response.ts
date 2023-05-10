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

