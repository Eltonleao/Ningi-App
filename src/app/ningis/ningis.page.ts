import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';

import {DashboardPage} from '../dashboard/dashboard.page';


import { Ningi, NingiService } from "../services/ningi.service";

import { AlertController } from "@ionic/angular";
import { LoadingController } from "@ionic/angular";
import { stringify } from '@angular/compiler/src/util';
import { PopoverPage } from '../popover/popover.page';

@Component({
  selector: 'app-ningis',
  templateUrl: './ningis.page.html',
  styleUrls: ['./ningis.page.scss'],
})
export class NingisPage implements OnInit {
  // @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  ningis: Ningi[];
  ningiLimit = 30;

  constructor(
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public ningiService: NingiService,
    public platform: Platform,
    public popoverController: PopoverController,
    public popover: PopoverPage
    // public infiniteScroll: IonInfiniteScroll
    // private loadingController: LoadingController
  ) {
  }

  async ngOnInit() {

    const loading = await this.loadingCtrl.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
    });
    await loading.present();

    this.loadNingis(this.ningiLimit).then(async () => {
      loading.dismiss();
    })
  }

  loadNingis(limit = null): Promise<any> {
    var env = this;
    return this.ningiService.getNingis(async function (res: any) {
      await console.log(res);
      env.ningis = await res;
      await console.log('cheguei aqui');
      env.ningis.map((x: { data_criacao: string | number | Date; }) => {
        // x.data_criacao = new Date(x.data_criacao);
        var date = new Date(x.data_criacao);
        var dc = {
          ano: date.getFullYear() + 1 < 10 ? "0" + stringify(date.getFullYear() + 1) : date.getFullYear(),
          mes: date.getMonth() + 1 < 10 ? "0" + stringify(date.getMonth() + 1) : date.getMonth(),
          dia: date.getDate() < 10 ? "0" + stringify(date.getDate()) : date.getDate(),
          hora: date.getHours() < 10 ? "0" + stringify(date.getHours()) : date.getHours(),
          min: date.getMinutes() < 10 ? "0" + stringify(date.getMinutes()) : date.getMinutes(),
          seg: date.getSeconds() < 10 ? "0" + stringify(date.getSeconds()) : date.getSeconds(),
        };

        x.data_criacao = dc.dia + '/' + dc.mes + '/' + dc.ano + ' - ' + dc.hora + ':' + dc.min;

      })
      // })
    }, limit);

  }

  remove(ningi) {
    // console.log(ningi);
    this.ningiService.remove(ningi);
  }

  async doRefresh(event) {
    await this.ngOnInit();
    await event.target.complete();
  }


  ionViewDidEnter() {
    console.log("I'm alive!");
    this.ngOnInit();
  }


  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverPage,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true,
      animated: true
    });
    return await popover.present();
  }
}
