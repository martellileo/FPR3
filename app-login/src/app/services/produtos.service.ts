import { inject, Service } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Produto } from '../modelos/produto.model';
// import { LoginService } from './login.service';

@Service()
export class ProdutosService {
    private urlBase = environment.api + "/produtos"
    private httpClient = inject(HttpClient)
    // private loginService = inject(LoginService)

    public obterTodos() {
        return this.httpClient.get<Produto[]>(this.urlBase)
    }


    // private getHttpOptions() {
    //     const httpOptions = {
    //         headers: new HttpHeaders({
    //             Authorization: 'Bearer ' + this.loginService.getToken(),
    //         })
    //     }
    //     return httpOptions;
    // }
}
