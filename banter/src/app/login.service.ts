import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private _http: HttpClient) { }

  getAuth(credentials: any) {
    return this._http.post('http://localhost:3000/api/users/login', credentials);
  }

  postCredentials(credentials: any) {
    return this._http.post('http://localhost:3000/api/users/register', credentials);
  }

  patchCredentials(credentials: any) {
    return this._http.patch('http://localhost:3000/api/users', credentials);
  }
}
