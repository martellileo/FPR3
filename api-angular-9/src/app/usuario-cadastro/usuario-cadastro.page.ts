import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular';
import { IonList, IonItem, IonInput } from '@ionic/angular';
import { IonButton } from '@ionic/angular';
import { User } from '../modelos/user.modelo';
import { UsersService } from '../api/users.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-usuario-cadastro',
  templateUrl: './usuario-cadastro.page.html',
  styleUrls: ['./usuario-cadastro.page.scss'],
  imports: [
    ReactiveFormsModule, RouterLink,
    IonButton,
    IonList,
    IonInput,
    IonItem,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
  ],
})
export class UsuarioCadastroPage implements OnInit {
  private usersService = inject(UsersService);
  private router = inject(Router);

  //NonNullableFormBuilder
  //FormBuilder
  //UntypedFormBuilder
  private formBuilder = inject(NonNullableFormBuilder);

  protected form = this.formBuilder.group({
    first_name: ['', [Validators.required, Validators.minLength(3)]],
    last_name: [''],
    email: [''],
    id: [0],
    avatar: [],
  });

  constructor() {}

  ngOnInit() {}

  protected cadastrar() {
    console.log(this.form.valid);
    if (this.form.valid) {
      const user: User = this.form.getRawValue();

      this.usersService.cadastrar(user).subscribe({
        next: (user) => {
          console.log(user);
          // this.form.reset();
          this.router.navigate(['/home']);
        },
        error: (e) => {
          console.log(e);
        },
      });
    } else {
      console.log('Formulário inválido.');
    }
  }
}
