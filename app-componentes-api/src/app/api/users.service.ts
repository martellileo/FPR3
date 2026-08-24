import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserResponse } from '../modelos/user-response.modelo';
import { User } from '../modelos/user.modelo';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private httpClient = inject(HttpClient);
  private urlBase = environment.api + '/users';

  public obterTodos() {
    return this.httpClient.get<User[]>(this.urlBase);
  }

  public obterPeloId(id: number) {

  }

  public cadastrar(user: any) {

  }

  public remover(id: number) {
    console.log(`${this.urlBase}/${id}`)
    return this.httpClient.delete<User[]>(`${this.urlBase}/${id}`)
  }
}
