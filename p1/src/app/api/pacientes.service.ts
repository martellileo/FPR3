import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { Medico } from '../model/medico.model';
import { Paciente } from '../model/paciente.model';

@Injectable({
    providedIn: 'root'
})
export class PacientesService {
    private httpClient = inject(HttpClient)
    private url = environment.api + '/pacientes'

    public obterTodos() {
        return this.httpClient.get<Paciente[]>(this.url)
    }

    public obterPorId(id: number | string) {
        return this.httpClient.get<Paciente>(`${this.url}/${id}`)
    }
}
