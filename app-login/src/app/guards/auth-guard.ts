import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/login.service';

export const authGuard: CanActivateFn = (route, state) => {
  
  console.log("acessou a guard")
  const loginService = inject(LoginService);
  const router = inject(Router)
  const usuarioLogado = loginService.getPayload();

  if(loginService.getToken()) {
    return true;
  }

  router.navigate(['/home'])
  return false;
};
