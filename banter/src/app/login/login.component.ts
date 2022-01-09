//import { InvokeFunctionExpr } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { LoginService } from '../login.service';
import { User } from '../user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: any;
  password: any;
  //@Input() loggedIn: boolean = false;
  logInData: any = {redirect: "/login", loggedIn: false, user: null};
  user: any;
  showPass: boolean = false;

  signUpBtnName: string = "Sign Up";
  logInBtnName: string = "Log In";
  // nextPageText: string = "Next Page →";

  constructor(private _login: LoginService, private _data: DataService, private router: Router) { }

  ngOnInit(): void {
  }

  authorize(username: string, password: string) {
    const credentials = {
      username: username,
      password: password
    }

    this._login.getAuth(credentials).subscribe(data => {
      this.logInData = data;
    });

    if (this.logInData.loggedIn) {
      sessionStorage.setItem('currUser', JSON.stringify(this.logInData.user[0]));
    }

    console.log(this.logInData);
    this.router.navigate([this.logInData.redirect]);
  }

  changeUser(newUser: any) {
    this._data.changeUser(newUser);
  }

  showPassword() {
    this.showPass = !this.showPass;
  }
}
