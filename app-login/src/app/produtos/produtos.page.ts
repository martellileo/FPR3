import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonRow, IonTitle, IonToolbar } from '@ionic/angular';
import { ProdutosService } from '../services/produtos.service';
import { Produto } from '../modelos/produto.model';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.page.html',
  styleUrls: ['./produtos.page.scss'],
  imports: [CommonModule, FormsModule, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonRow, IonTitle, IonToolbar]
})
export class ProdutosPage implements OnInit {

  private produtoService = inject(ProdutosService)
  private loginService = inject(LoginService) 
  protected produtos: Produto[] = [];

  constructor() { }

  ngOnInit() {
    this.obterProdutos();
  }

  private obterProdutos() {
    this.produtoService.obterTodos().subscribe({
      next: (produtos) => {
        this.produtos = produtos ?? [];
      },
      error: (e) => console.error(e)
    }) 
  }


}
