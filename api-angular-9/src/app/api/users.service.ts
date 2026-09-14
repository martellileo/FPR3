import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../modelos/user.modelo';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private httpClient = inject(HttpClient);
  private urlBase = environment.api + '/users';

  public obterTodos() {
    //GET http://localhost:3000/users
    return this.httpClient.get<User[]>(this.urlBase);
  }

  public obterPeloId(id: string) {
    //GET http://localhost:3000/users/:id
    return this.httpClient.get<User>(`${this.urlBase}/${id}`)
  }
  public obterPeloNome(nome: string) {
    //GET http://localhost:3000/users?first_name:contains=xxxxxx
    return this.httpClient.get<User[]>(`${this.urlBase}?first_name:contains=${nome}`)
  }

  public cadastrar(user: User) {
    return this.httpClient.post(this.urlBase, user)
  }

  public remover(id: string) {
    //DELETE http://localhost:3000/users/:id
    // return this.httpClient.delete(this.urlBase + '/' + id);
    return this.httpClient.delete(`${this.urlBase}/${id}`);
  }

    public alterar(user: User) {
    // PUT http://localhost:3000/users/:id
    return this.httpClient.put<User>(`${this.urlBase}/${user.id}`, user);
  }
}
