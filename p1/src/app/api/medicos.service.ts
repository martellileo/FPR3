import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { Medico } from '../model/medico.model';

@Injectable({
    providedIn: 'root'
})
export class MedicosService {
    private httpClient = inject(HttpClient)
    private url = environment.api + '/medicos'

    public obterTodos() {
        return this.httpClient.get<Medico[]>(this.url)
    }

    public obterPorId(id: number | string) {
        return this.httpClient.get<Medico>(`${this.url}/${id}`)
    }
}
