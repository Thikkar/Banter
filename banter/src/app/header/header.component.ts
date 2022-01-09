import { Component, OnInit, Input, SimpleChanges, ChangeDetectorRef, OnChanges } from '@angular/core';
import { AuthService } from '../auth.service';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnChanges {

  isScrolled: boolean = false;
  @Input() isLoggedIn: boolean = false;
  currUser: any;

  constructor (public auth: AuthService, private cd: ChangeDetectorRef) {
    
  }

  ngOnInit() {
    this.currUser = sessionStorage.getItem('currUser')
  }

  ngOnChanges(changes: SimpleChanges) {
    /*this.isLoggedIn = false;
    this.cd.detectChanges();
    this.isLoggedIn = true;*/
    console.log(changes);
    const loggedInValue = changes['isLoggedIn'];
    /*if (loggedInValue.currentValue === true) {
      this.isLoggedIn = true
    } else if (loggedInValue.currentValue === false) {
      this.isLoggedIn = false
    }*/

    this.isLoggedIn = loggedInValue.currentValue;
  }

  @HostListener("window:scroll", []) onScroll() {
      window.pageYOffset >= 20 ? (this.isScrolled = true) : (this.isScrolled = false);
  }

  changelog() {
    this.isLoggedIn = !this.isLoggedIn;
  }

}
