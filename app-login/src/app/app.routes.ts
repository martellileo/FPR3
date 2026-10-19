import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'produtos',
    canActivate: [authGuard],
    loadComponent: () => import('./produtos/produtos.page').then( m => m.ProdutosPage)
  },
];
