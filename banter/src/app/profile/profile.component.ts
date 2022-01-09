import { Component, OnInit } from '@angular/core';
import { last } from 'rxjs/operators';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  editMode: boolean = false;
  currUser: any = JSON.parse(sessionStorage.currUser)

  first_name: string = this.currUser.first_name;
  last_name: string = this.currUser.last_name;
  username: string = this.currUser.username;
  password: string = this.currUser.password;
  favTeam: string = this.currUser.favTeam;

  constructor(private _login: LoginService) { }

  ngOnInit(): void {
    
  }

  toggleEdit() {
    this.editMode = !this.editMode
  }

  updateCredentials(first_name: string, last_name: string, username: string, favTeam: string) {
    const credentials = {
      "original_username": this.currUser.username,
      "first_name": first_name,
      "last_name": last_name,
      "username": username,
      "favTeam": favTeam
    }
    
    this._login.patchCredentials(credentials).subscribe(data => {
      console.log(data);
    })
  }
}
