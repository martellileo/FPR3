import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/login-service';
import { inject } from '@angular/core';

export const guestGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService);
  const router = inject(Router)
  const usuarioLogado = loginService.getPayload();

  if(loginService.getToken()) {
    return true;
  }

  router.navigate(['/tasks'])
  return false;
};
