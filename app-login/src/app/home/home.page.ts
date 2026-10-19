import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonInputPasswordToggle } from '@ionic/angular';
import { IonItem } from "@ionic/angular";
import { IonInput } from "@ionic/angular";
import { IonButton } from "@ionic/angular";
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [ReactiveFormsModule, IonButton, IonInput, IonItem, IonHeader, IonToolbar, IonTitle, IonContent, IonInputPasswordToggle],
})
export class HomePage {

  private loginService = inject(LoginService);
  private router = inject(Router)

  private formBuilder = inject(NonNullableFormBuilder);
  protected form = this.formBuilder.group({
    login: ['', [Validators.required]],
    senha: ['', [Validators.required, Validators.minLength(6)]]
  })

  constructor() {
    this.loginService.removeToken();
  }

  protected acessar() {
    console.log(this.form.value);
    if (this.form.valid) {
      const login = this.form.getRawValue();
      this.loginService.login(login).subscribe({
        next: (loginResponse) => {
          console.log(loginResponse);
          this.loginService.setToken(loginResponse.access_token)
          this.router.navigate(['/produtos']);
        },
        error: (e) => console.error(e)
      })
    } else {
      console.log("Preencha todos os campos.");
      
    }
  }
}
