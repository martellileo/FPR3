import { Component } from '@angular/core';
import { addIcons } from 'ionicons';
import { heart } from 'ionicons/icons'
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon],
})
export class HomePage {
  constructor() {

    addIcons ({ heart });
  }

  protected exibir() {
    console.log("metodo exibir");
  }
}

