import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonInput, IonItem, IonInputPasswordToggle, IonButton } from '@ionic/angular';
import { LoginService } from '../services/login-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, ReactiveFormsModule, IonInput, IonItem, IonInputPasswordToggle, IonButton],
})
export class LoginPage implements OnInit {
  private loginService = inject(LoginService);
  private router = inject(Router)

  constructor() {
    this.loginService.removeToken();
  }

  ngOnInit() {
  }

  private formBuilder = inject(NonNullableFormBuilder);
  protected form = this.formBuilder.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]]
  })

  protected acessar() {
    console.log(this.form.value);
    if (this.form.valid) {
      const login = this.form.getRawValue();
      this.loginService.login(login).subscribe({
        next: (loginResponse) => {
          console.log(loginResponse);
          this.loginService.setToken(loginResponse.access_token)
          this.router.navigate(['/tasks']);
        },
        error: (e) => console.error(e)
      })
    } else {
      console.log("Preencha todos os campos.");
    }
  }

}
