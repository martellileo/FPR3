import { Component, inject, signal } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonIcon,
  IonSearchbar,
  IonAvatar,
} from '@ionic/angular';
import { UsersService } from '../api/users.service';
import { User } from '../modelos/user.modelo';
import { IonButton, IonList, IonItem, IonLabel } from '@ionic/angular';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { addIcons } from 'ionicons';
import { personCircle } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonAvatar, 
    IonSearchbar,
    IonButtons,
    IonIcon,
    IonLabel,
    IonButton,
    IonItem,
    IonList,
    IonButton,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    AsyncPipe,
    RouterLink,
  ],
})
export class HomePage {
  private usersService = inject(UsersService);
  // protected users: User[] = [];
  // protected users$ = this.usersService.obterTodos();
  protected users = signal<User[]>([]);

  //Observable --> API
  //Signal

  constructor() {
    this.obterUsuarios();

    addIcons({ personCircle });
  }

  private obterUsuarios() {
    this.usersService.obterTodos().subscribe({
      //sucesso
      next: (resposta: User[]) => {
        console.log(resposta);
        this.users.set(resposta);
      },
      //erro
      error: (e) => {
        console.error(e);
      },
    });
  }

  protected remover(id: number) {
    this.usersService.remover(id).subscribe({
      next: () => {
        this.obterUsuarios();
      },
      error: (e) => {
        console.error(e);
      },
    });
  }

  protected handleInput(event: Event) {
    const target = event.target as HTMLIonSearchbarElement;
    const query = target.value?.toLowerCase() || '';

    if (!query) {
      this.obterUsuarios();
      return;
    }

    this.usersService.obterTodos().subscribe({
      next: (users: User[]) => {
        const filter = users.filter((user) =>
          user.first_name.toLowerCase().includes(query) ||
          user.last_name.toLowerCase().includes(query) ||
          user.id.toString().includes(query)
        );
        this.users.set(filter);
      },
      error: (e) => console.error(e),
    });
  }
}
