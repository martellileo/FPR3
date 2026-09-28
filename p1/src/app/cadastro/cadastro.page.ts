import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, NonNullableFormBuilder, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonInput, IonItem, IonList, IonTitle, IonToolbar, IonSelect, IonSelectOption, IonButton } from '@ionic/angular';
import { MedicosService } from '../api/medicos.service';
import { Medico } from '../model/medico.model';
import { Paciente } from '../model/paciente.model';
import { PacientesService } from '../api/pacientes.service';
import { AgendamentosService } from '../api/agendamentos.service';
import { Agendamento } from '../model/agendamento.model';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
  imports: [RouterLink, IonButton, IonItem, IonInput, IonList, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, ReactiveFormsModule, IonSelect, IonSelectOption]
})
export class CadastroPage implements OnInit {
  private medicoService = inject(MedicosService);
  protected medicos = signal<Medico[]>([]);
  private pacienteService = inject(PacientesService);
  protected pacientes = signal<Paciente[]>([]);
  private agendamentoService = inject(AgendamentosService);
  private router = inject(Router);
  private formBuilder = inject(NonNullableFormBuilder)

  protected form = this.formBuilder.group({
    data: ['', Validators.required],
    hora: ['', Validators.required],
    minuto: ['', Validators.required],
    status: ['', Validators.required],
    medico: ['', Validators.required],
    paciente: ['', Validators.required],
    observacoes: ['']
  });

  constructor() {
    this.obterMedicos();
    this.obterPacientes();
  }

  ngOnInit() {
  }

  private obterMedicos() {
    this.medicoService.obterTodos().subscribe({
      next: (resposta: Medico[]) => {
        this.medicos.set(resposta);
      },
      error: (erro) => console.error(erro),
    });
  }

  private obterPacientes() {
    this.pacienteService.obterTodos().subscribe({
      next: (resposta: Paciente[]) => {
        this.pacientes.set(resposta);
      },
      error: (erro) => console.error("Api não está disponivel"),
    });
  }

  protected cadastrar() {
    const resposta = this.form.getRawValue();
    const agendamento: Agendamento = {
      data: resposta.data,
      horario: `${resposta.hora}:${resposta.minuto}`,
      status: resposta.status,
      observacoes: resposta.observacoes,
      medicoId: Number(resposta.medico),
      pacienteId: Number(resposta.paciente)
    };

    console.log(agendamento)
    this.agendamentoService.cadastrar(agendamento).subscribe({
      next: () => this.router.navigate(['/agendamento']),
      error: (erro) => {
        console.error('Erro ao cadastrar agendamento:', erro);
      }
    });
  }

}
