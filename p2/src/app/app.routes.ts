import type { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';
import { adminGuard } from './guards/admin-guard';
import { guestGuard } from './guards/guest-guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'tasks',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then((m) => m.LoginPage),
    canActivate: [guestGuard]
  },
  {
    path: 'tasks',
    loadComponent: () => import('./tasks/tasks.page').then((m) => m.TasksPage),
    canActivate: [authGuard]
  },
  {
    path: 'users',
    loadComponent: () => import('./admin/users/users.page').then((m) => m.UsersPage),
    canActivate: [adminGuard]
  },
];
