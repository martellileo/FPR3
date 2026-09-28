import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonButton, IonContent, IonHeader, IonItem, IonLabel, IonList, IonTitle, IonToolbar } from '@ionic/angular';
import { MedicosService } from '../api/medicos.service';
import { PacientesService } from '../api/pacientes.service';
import { AgendamentosService } from '../api/agendamentos.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Medico } from '../model/medico.model';
import { Paciente } from '../model/paciente.model';
import { Agendamento } from '../model/agendamento.model';

@Component({
  selector: 'app-detalhe',
  templateUrl: './detalhe.page.html',
  styleUrls: ['./detalhe.page.scss'],
  imports: [RouterLink, IonButton, IonLabel, IonItem, IonList, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class DetalhePage implements OnInit{
  private route = inject(ActivatedRoute)
  private medicoService = inject(MedicosService)
  protected medico!: Medico;
  private pacienteService = inject(PacientesService)
  protected paciente!: Paciente;
  private agendamentoService = inject(AgendamentosService)
  protected agendamento!: Agendamento;
  private id: string | number | null;
  private medicoId: any;
  private pacienteId: any;

  constructor() {
    this.id = this.route.snapshot.paramMap.get('id');

    if(this.id)
      this.obterPorIdAgendamento(String(this.id));
  }

  ionViewDidEnter() {
    this.obterPorIdAgendamento(String(this.id));
  }

  ngOnInit() {

  }


  private obterPorIdAgendamento(id: string) {
    this.agendamentoService.obterPorId(id).subscribe({
      next: (agendamento) => {
        this.agendamento = agendamento;
        this.pacienteId = agendamento.pacienteId;
        this.medicoId = agendamento.medicoId;
        this.obterPorId();
      },
      error: (erro) => console.error(erro),
    });
  }

  private obterPorId() {
    this.medicoService.obterPorId(this.medicoId).subscribe({
      next: (medico) => {
        this.medico = medico;
      },
      error: (erro) => console.log(erro)
    })

    this.pacienteService.obterPorId(this.pacienteId).subscribe({
      next: (paciente) => {
        this.paciente = paciente;
      },
      error: (erro) => console.log(erro)
    })
  }

}