import { inject, Service } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Login } from '../modelo/login';
import { jwtDecode } from "jwt-decode";
import { LoginResponse } from '../modelo/login-response';

@Service()
export class LoginService {
  private urlBase = environment.api + '/auth/login';
  private http = inject(HttpClient);

  public login(login: Login) {
    return this.http.post<LoginResponse>(this.urlBase, login);
  }

  public setToken(token: string) {
    localStorage.setItem('TOKEN', token);
  }

  public getToken() {
    return localStorage.getItem('TOKEN');
  }

  public removeToken() {
    localStorage.removeItem('TOKEN');
  }

  public getPayload() {
    try {
      return jwtDecode(this.getToken()!);
    } catch (error) {
      return null;
    }
  }

}
