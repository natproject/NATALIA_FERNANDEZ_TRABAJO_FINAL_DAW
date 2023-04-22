import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  landing: boolean = true;

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/') {
          this.landing = true;
        } else if(event.url === '/login') {
          this.landing = true;
        } else if(event.url === '/register'){
          this.landing = true;
        }else{
          this.landing = false;
        }
      }
    });
  }
}


function elseif(arg0: boolean) {
  throw new Error('Function not implemented.');
}

