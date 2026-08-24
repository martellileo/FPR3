import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar, IonGrid, IonCol, IonRow, IonItem, IonLabel, IonAvatar, IonImg, IonIcon, IonButton } from '@ionic/angular/standalone';
import { UsersService } from '../api/users.service';
import { UserResponse } from '../modelos/user-response.modelo';
import { User } from '../modelos/user.modelo';
import { addIcons } from 'ionicons';
import { trash } from 'ionicons/icons';

@Component({
  selector: 'app-usuario-listagem',
  templateUrl: './usuario-listagem.page.html',
  styleUrls: ['./usuario-listagem.page.scss'],
  standalone: true,
  imports: [IonButton, IonIcon, IonLabel, IonItem, 
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
  ],
})
export class UsuarioListagemPage implements OnInit {
  private usersService = inject(UsersService);
  // protected userResponse: UserResponse | undefined;
  protected users: User[] = [];

  constructor() {
    this.obterUsuarios();

    addIcons({ trash });
  }

  ngOnInit() {}

  private obterUsuarios() {
    //síncrona
    console.log('1');

    //assíncrona
    this.usersService.obterTodos().subscribe({
      //sucesso
      // next: (resposta: UserResponse) => {
      //   console.log('2');
      //   console.log(resposta);
      //   this.userResponse = resposta;
      //   // this.users = resposta.data;
      // },
      next: (resposta: User[]) => {
        console.log('2');
        console.log(resposta);
        this.users = resposta;
        // this.users = resposta.data;
      },
      //erro
      error: (e) => {
        console.error(e);
      }
    });

    //síncrona
    console.log('3');
  }

  protected removerUsuario(id: number) {
    console.log("chamada remover" + id);
    this.usersService.remover(id).subscribe({
      next: (resposta) => {
        this.users = this.users.filter(user => user.id !== id);
      },
      error: (e) => {
        console.error(e);
      }
    });
  }
}
