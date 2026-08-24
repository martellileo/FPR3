import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonIcon,
  IonInput,
  IonList,
  IonItem,
  IonGrid,
  IonRow,
  IonCol,
  ToastController,
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import { heart, trash } from 'ionicons/icons';

interface Pessoa {
  nome?: string;
  endereco?: string;
  salario?: number;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonCol,
    IonRow,
    IonGrid,
    IonItem,
    IonList,
    IonInput,
    IonButton,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonIcon,
    FormsModule,
  ],
})
export class HomePage {
  // protected nome = '';
  protected pessoa: Pessoa = {};
  protected pessoas: Pessoa[] = [];
  private toastController: ToastController = inject(ToastController);

  constructor() {
    addIcons({ heart, trash });
  }

  private async exibirMensagem(mensagem: string) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 2000,
      position: 'bottom',
    });

    await toast.present();
  }

  protected exibir() {
    console.log('método exibir....');
    // console.log(this.nome);
  }

  protected adicionar() {
    this.pessoas.push(this.pessoa);
    this.exibirMensagem("Pessoa Cadastrada.");
    // this.nome = '';

    console.log(this.pessoas);
    this.pessoa = {};
  }

  protected remover(index: number) {
    this.pessoas.splice(index, 1);
  }
}
