import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { Agendamento } from '../model/agendamento.model';

@Injectable({
    providedIn: 'root'
})
export class AgendamentosService {
    private httpClient = inject(HttpClient)
    private url = environment.api + '/agendamentos'

    public obterTodos() {
        // GET /agendamentos
        return this.httpClient.get<Agendamento[]>(this.url)
    }

    public obterPorId(id: number | string) {
        // GET /agendamentos/:id
        return this.httpClient.get<Agendamento>(`${this.url}/${id}`)
    }

    public cadastrar(agendamento: Agendamento) {
        // POST /agendamentos
        return this.httpClient.post(this.url, agendamento)
    }

    public alterar(agendamento: Agendamento) {
        // PUT /agendamentos/:id
        return this.httpClient.put<Agendamento>(`${this.url}/${agendamento.id}`, agendamento)
    }

    public remover(id: string | number) {
        // DELETE /agendamentos/:id
        return this.httpClient.delete(`${this.url}/${id}`)
    }
}
