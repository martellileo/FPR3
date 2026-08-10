import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonInput } from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonInput, IonButton, IonHeader, IonToolbar, IonTitle, IonContent, FormsModule, RouterModule, RouterLink],
})
export class HomePage {
  public nome: string = "Leo";
  protected salario: number = 10000; //template html
  protected fonte: string = "font-weight: bold; color: red";
  private contador: number = 0;
  private telefone: string = "40028922"; // uso dentro da class

  constructor() {
    console.log(this.telefone)
    this.exibir()
  }

  protected exibir() {
    console.log("metodo exibir")
  }

  protected alterarEstilo(){
    if(this.contador == 1){
      this.fonte = "font-weight: bold; color: red";
      this.contador = 0;
    } else if(this.contador == 0){
      this.fonte = "text-align: center; color: blue;"
      this.contador = 1;
    }
  }
}
