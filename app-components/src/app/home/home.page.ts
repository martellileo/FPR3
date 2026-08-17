import { Component } from '@angular/core';
import { addIcons } from 'ionicons';
import { heart, trash } from 'ionicons/icons';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonIcon,
  IonList,
  IonItem,
  IonInput,
  IonCol,
  IonRow,
  IonGrid,
  ToastController,
} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';

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
    IonGrid,
    IonRow,
    IonCol,
    IonInput,
    IonItem,
    IonList,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonIcon,
    FormsModule,
  ],
})
export class HomePage {
  protected pessoa: Pessoa = {};
  protected pessoas: Pessoa[] = [];
  // private toastController: ToastController = inject(ToastController)

  constructor(private toastController: ToastController) {
    addIcons({ heart, trash });

    // this.pessoa = {
    //   nome: '',
    //   endereco: '',
    // };
  }

  protected async exibirMensagem(mensagem: string) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 1500,
      position: 'bottom',
    });

    await toast.present();
  }

  // protected exibir() {
  //   console.log('metodo exibir');
  //   console.log(this.pessoa.nome);
  // }

  protected adicionar() {
    this.pessoas.push(this.pessoa);
    console.log(this.pessoas);
    this.exibirMensagem('Pessoa adicionada!');

    this.pessoa = {}
  }

  protected remover(index: number){
    this.pessoas.splice(index, 1);
    this.exibirMensagem("Pessoa removida");
  }
}
