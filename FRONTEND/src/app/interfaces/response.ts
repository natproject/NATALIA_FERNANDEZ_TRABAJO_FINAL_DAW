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