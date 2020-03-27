import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpService} from './http.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpService) { }

  login(loginBody: any) {
    return this.http.post('login', loginBody);
  }

  register(registerBody: any) {
    return this.http.post('register', registerBody);
  }

  getUsers() {
    return this.http.get('users');
  }
}
