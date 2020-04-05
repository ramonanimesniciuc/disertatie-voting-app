import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpService} from './http.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public username:string;
  constructor(private http: HttpService) { }

  login(loginBody: any) {
    return this.http.post('api/auth/signin', loginBody);
  }

  register(registerBody: any) {
    return this.http.post('api/auth/signup', registerBody);
  }

  getUsers() {
    return this.http.get('users');
  }
}
