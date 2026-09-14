import { Component, inject, signal } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonIcon,
  IonSearchbar,
  IonAlert,
  AlertController,
} from '@ionic/angular';
import { UsersService } from '../api/users.service';
import { User } from '../modelos/user.modelo';
import { IonButton, IonList, IonItem, IonLabel } from '@ionic/angular';
import { AsyncPipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

import { addIcons } from 'ionicons';
import { personCircle } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonAlert, 
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
    RouterLink,
  ],
})
export class HomePage {
  private usersService = inject(UsersService);
  // protected users: User[] = [];
  // protected users$ = this.usersService.obterTodos();
  protected users = signal<User[]>([]);
  protected router = inject(Router);
  protected idUserDelete = '';
  protected alertController = inject(AlertController);

  //Observable --> API
  //Signal

  constructor() {
    addIcons({ personCircle });
  }

  protected alertButtons = [
    
  ]

  protected async alertOpen(id: any) {
    const alert = this.alertController.create({
      header: "Confirmar Exclusão",
      message: "Deseja realmente excluir o usuário?",
      buttons: [
        {
          text: 'Sim',
          role: 'Confirmar',
          handler: () => {
            this.remover(id)
          }
        }
      ]
    });
    (await alert).present();
  }

  ionViewDidEnter(){
      this.obterUsuarios();
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

  protected remover(id: any) {
    this.usersService.remover(id).subscribe({
      next: () => {
        this.obterUsuarios();
      },
      error: (e) => {
        console.error(e);
      },
    });
  }

  protected navegarId(id: any){
    this.router.navigate(['/usuario-alter', id])
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
