import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonCol, IonRow, IonButton, ToastController } from '@ionic/angular/standalone';

interface Time {
  nome?: string;
  pontos?: number;
  vitorias?: number;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonButton, IonRow, IonCol, IonGrid, IonHeader, IonToolbar, IonTitle, IonContent],
})
export class HomePage {

  protected time: Time = {};
  protected times: Time[] = [];
  protected valendo = 1;

  constructor(private toastController: ToastController) {
    this.times = [
      { nome: 'Nós', pontos: 0, vitorias: 0 },
      { nome: 'Eles', pontos: 0, vitorias: 0 },
    ];
  }

  protected async exibirMensagem(mensagem: string) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 2000,
      position: 'bottom',
    });

    await toast.present();
  }

  protected adicionar(index: number) {
    let anterior: any = this.times[index].pontos;

    if (this.times[index].pontos! < 12) {
      this.times[index].pontos!+= this.valendo;
      this.exibirMensagem("Time " + this.times[index].nome + " pontuou!")
    }

    let posterior: any = this.times[index].pontos

    if(this.times[index].pontos! === 12) {
      this.vitoria(index);
      this.times[0].pontos = 0;
      this.times[1].pontos = 0;
      this.exibirMensagem("Time " + this.times[index].nome + " venceu!")
    }

    if(posterior - anterior != 1){
      this.valendo = 1;
    }
  }

  protected remover(index: number) {
    if (this.times[index].pontos! > 0) {
      this.times[index].pontos!--;
    }
  }

  private vitoria(index: number) {
    this.times[index].vitorias!++;
  }

  protected zerarPontos(){
    this.times[0].pontos = 0;
    this.times[1].pontos = 0;
  }

  protected zerarVitorias() {
    this.times[0].vitorias = 0;
    this.times[1].vitorias = 0;
  }

  protected truco() {
    if(this.valendo === 1)
      this.valendo = 3;
    else if(this.valendo < 10)
      this.valendo += 3;
  }
}
