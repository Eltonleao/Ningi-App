import { Component, OnInit } from '@angular/core';
import { AlertController } from "@ionic/angular";

@Component({
  selector: 'app-spends',
  templateUrl: './spends.page.html',
  styleUrls: ['./spends.page.scss'],
})
export class SpendsPage implements OnInit {

  constructor(
    public alertCtrl: AlertController
  ) { }

  ngOnInit() {
  }

  async edit(){
    const alert = await this.alertCtrl.create({
      cssClass: "my-custom-class",
      header: "Editar",
      // subHeader: "Confirma operação?",
      message: "",
      buttons: [
        "cancel",
        {
          text: "Okay",
          handler: async () => {
          },
        },
      ],
    });

    await alert.present();
  }

  async delete(){
    const alert = await this.alertCtrl.create({
      cssClass: "my-custom-class",
      header: "Deletar",
      // subHeader: "Confirma operação?",
      message: "",
      buttons: [
        "cancel",
        {
          text: "Okay",
          handler: async () => {
          },
        },
      ],
    });

    await alert.present();
  }

}
