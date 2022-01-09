import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  getToken() {
    return sessionStorage.getItem('currUser');
  }

  isLoggedIn() {
    return this.getToken() !== null;
  }

  logout() {
    sessionStorage.removeItem('currUser');
  }
}
