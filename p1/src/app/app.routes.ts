import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'agendamento',
    loadComponent: () => import('./agendamento/agendamento.page').then((m) => m.AgendamentoPage),
  },
  {
    path: '',
    redirectTo: 'agendamento',
    pathMatch: 'full',
  },
  {
    path: 'cadastro',
    loadComponent: () => import('./cadastro/cadastro.page').then( m => m.CadastroPage)
  },
  {
    path: 'detalhe/:id',
    loadComponent: () => import('./detalhe/detalhe.page').then( m => m.DetalhePage)
  },
];
