import { Component, inject, signal } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonButton, IonRouterLink } from '@ionic/angular';
import { AgendamentosService } from '../api/agendamentos.service';
import { Agendamento } from '../model/agendamento.model';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-agendamento',
  templateUrl: 'agendamento.page.html',
  styleUrls: ['agendamento.page.scss'],
  imports: [RouterLink, IonButton, IonRow, IonGrid, IonHeader, IonToolbar, IonTitle, IonContent, IonCol, IonRouterLink],
})
export class AgendamentoPage {
  private router = inject(Router)
  private agendamentoService = inject(AgendamentosService)
  protected agendamentos = signal<Agendamento[]>([]);

  constructor() {}

  ionViewDidEnter() {
    this.obterAgendamentos();
  }

  private obterAgendamentos() {
    this.agendamentoService.obterTodos().subscribe({
      next: (resposta: Agendamento[]) => {
        this.agendamentos.set(resposta);
      },
      error: (erro) => console.error(erro),
    })
  }

  protected navegarId(id: any) {
    this.router.navigate(['/detalhe', id])
  }
}
