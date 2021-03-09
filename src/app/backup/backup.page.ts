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

  doBackup() {
    this.download();
  }

  download() {
    this.file.writeFile('/', 'hello.txt', 'hello world').then(function(){
      alert('ok')
    }).catch(function(){
      alert('erro');
    })
  }




  sendEmail() {
    let email = {
      to: 'max@mustermann.de',
      cc: 'erika@mustermann.de',
      bcc: ['john@doe.com', 'jane@doe.com'],
      attachments: [
        'file://img/logo.png',
        'res://icon.png',
        'base64:icon.png//iVBORw0KGgoAAAANSUhEUg...',
        'file://README.pdf'
      ],
      subject: 'Cordova Icons',
      body: 'How are you? Nice greetings from Leipzig',
      isHtml: true
    };

    // Send a text message using default options
    this.emailComposer.open(email);
  }

}
