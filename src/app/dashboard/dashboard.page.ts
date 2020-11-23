import { Component, OnInit } from "@angular/core";
import { AlertController } from "@ionic/angular";
import { LoadingController } from "@ionic/angular";

import { ApiService } from "../services/api.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.page.html",
  styleUrls: ["./dashboard.page.scss"],
})
export class DashboardPage implements OnInit {
  constructor(
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public api: ApiService
  ) {}

  ngOnInit() {}

  async carteira() {
    const alert = await this.alertCtrl.create({
      cssClass: "my-custom-class",
      header: "Carteira",
      translucent: true,
      // subHeader: "Confirma operação?",
      message: "Digite o valor da operação",
      inputs:[
        {
          name: 'valor',
          type: 'number',
          placeholder: 'R$ 42,90',
          attributes: {
            autocomplete: 'false'
          }
        }
      ],
      buttons: [
        {
          text: "cancel"
        },
        {
          text: "Okay",
          handler: async () => {
            const loading = await this.loadingCtrl.create({
              cssClass: "my-custom-class",
              // message: "Please wait...",
              duration: 2000,
            });
            await loading.present();
          },
        },
      ],
    });
    await alert.present().then(() => {
      const firstInput: any = document.querySelector('ion-alert input');
      firstInput.focus();
      return;
    });
  }


  apiTest(){
    this.api.teste();
  }
}
