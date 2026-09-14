import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonButton,
  IonInput,
} from '@ionic/angular';
import { UsersService } from '../api/users.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../modelos/user.modelo';

@Component({
  selector: 'app-usuario-alter',
  templateUrl: './usuario-alter.page.html',
  styleUrls: ['./usuario-alter.page.scss'],
  imports: [
    IonButton,
    IonInput, 
    IonItem,
    IonList,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
  ],
})
export class UsuarioAlterPage {
  private usersService = inject(UsersService);
  private route = inject(ActivatedRoute);
  private user!: User;
  private router = inject(Router);

  private formBuilder = inject(NonNullableFormBuilder);

  protected form = this.formBuilder.group({
    first_name: ['', [Validators.required, Validators.minLength(3)]],
    last_name: [''],
    email: [''],
    id: [0],
    avatar: [''],
  });
  
  constructor() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id)
      this.obterPorId(id);

  }

  protected alterar() {
    if (this.form.valid) {
      const user: User = this.form.getRawValue();

      this.usersService.alterar(user).subscribe({
        next: () => {
          this.router.navigate(['/home']);
        },
        error: (e) => {
          console.error('Erro ao atualizar usuário:', e);
        }
      });
    }
  }

  private obterPorId(id: string) {
    this.usersService.obterPeloId(id).subscribe({
      next: (user) => {
        this.user = user;
        console.log(this.user)
        this.form.setValue(this.user);
      },
      error: (e) => {
        console.error(e);
      },
    });
  }
}
