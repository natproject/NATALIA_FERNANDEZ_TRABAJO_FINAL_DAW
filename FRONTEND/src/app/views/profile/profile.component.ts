import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  public noImage = false;
  public name = "";
  public image = "";
  public bio = "";
  constructor(private router: Router) { }

  ngOnInit() {
    if (!localStorage.getItem('token')) {
      this.router.navigate(['/login']);
    } else {
      let perfil = localStorage.getItem('perfilUsuario');
      if (perfil !== null) {
        const perfilUsuario = JSON.parse(perfil);
        this.name = perfilUsuario["username"];
        this.bio = perfilUsuario["perfil"]["bio"];
        if(perfilUsuario["perfil"]["image"] !== null){
          this.image = perfilUsuario["perfil"]["image"];
        }else{
          this.noImage = true;
        }
      }
    }
  }

}