import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header-landing',
  templateUrl: './header-landing.component.html',
  styleUrls: ['./header-landing.component.css']
})
export class HeaderLandingComponent {
  @Input() landing: boolean = false;

}
