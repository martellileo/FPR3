import { Component } from '@angular/core';
import { addIcons } from 'ionicons';
import { heart } from 'ionicons/icons';
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
  IonLabel,
} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonLabel,
    // IonGrid,
    // IonRow,
    // IonCol,
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
  protected nome = '';
  protected pessoas: string[] = [];

  constructor() {
    addIcons({ heart });
  }

  protected exibir() {
    console.log('metodo exibir');
    console.log(this.nome);
  }

  protected adicionar() {
    this.pessoas.push(this.nome);
    this.nome = '';

    console.log(this.pessoas);
  }
}
