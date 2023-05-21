import { Component, Input } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-landing',
  templateUrl: './header-landing.component.html',
  styleUrls: ['./header-landing.component.css']
})
export class HeaderLandingComponent {
  @Input() landing: boolean = false;

  constructor(private DataService: DataService, private router: Router) { }

  logout() {
    this.DataService.getResponseLogout().subscribe({
      next: response => {
        if (response) {
          this.router.navigate(['/']);
        }
      },
      error: error => {
        console.log('Error:', error);
      }
    });
  }

  out() {
    if(!localStorage.getItem('token')){
      this.router.navigate(['']);
    }else{
      this.router.navigate(['/home']);
    }
  }
}
