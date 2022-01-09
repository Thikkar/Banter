import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  first_name: any;
  last_name: any;
  username: any;
  password: any;
  favTeam: any;
  signUpBtnName: string = "Sign Up";
  backBtnName: string = "← Log In";

  constructor(private _signup: LoginService) { }

  ngOnInit(): void {
  }

  signUp(first_name: string, last_name: string, username: string, password: string, favTeam: string) {
    const credentials = {
      "first_name": first_name,
      "last_name": last_name,
      "username": username,
      "password": password,
      "favTeam": favTeam
    }
    
    this._signup.postCredentials(credentials).subscribe(data => {
      console.log(data)
    });
  }

}
