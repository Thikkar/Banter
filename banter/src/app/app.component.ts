import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  isScrolled: boolean = false;  

  constructor (public auth: AuthService) {
  }

  ngOnInit() {

  }

  @HostListener("window:scroll", []) onScroll() {
    window.pageYOffset >= 1 ? (this.isScrolled = true) : (this.isScrolled = false);
  }
  
  
  title = 'banter';
}
