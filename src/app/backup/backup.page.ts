import { Component, OnInit } from '@angular/core';
import { NingiService } from "../services/ningi.service";
import { LoadingController } from "@ionic/angular";
import { AlertController } from "@ionic/angular";

import { EmailComposer } from '@ionic-native/email-composer/ngx';

import { File } from '@ionic-native/file/ngx';


@Component({
  selector: 'app-backup',
  templateUrl: './backup.page.html',
  styleUrls: ['./backup.page.scss'],
})
export class BackupPage implements OnInit {

  constructor(
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public ningiService: NingiService,
    public emailComposer: EmailComposer,
    public file: File
  ) { }

  ngOnInit() {
  }

  async doBackup() {
    const loading = await this.loadingCtrl.create({
      spinner: "circular"
    });
    await loading.present();
    var env = this;
    this.ningiService.getNingis(function (ningis: any) {
      console.log(ningis);
      env.generateJSON(ningis);
      loading.dismiss();
    })
  }

  generateJSON(json_data) {
    var now = new Date();
    var obj = json_data;
    var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(obj));

    var a = document.createElement('a');
    a.href = 'data:' + data;
    a.download = 'ningis_'+now+'.json';
    a.innerHTML = 'download JSON';

    var container = document.getElementById('download-container');
    container.appendChild(a);
  }


}
