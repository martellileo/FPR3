import { Medico } from "./medico.model";
import { Paciente } from "./paciente.model";

export interface Agendamento {
    id?: number | string,
    data: string,
    horario: string,
    observacoes: string,
    status: string,
    medicoId: string | number
    pacienteId: string | number
}
