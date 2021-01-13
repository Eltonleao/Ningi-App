import {Ningi, NingiService} from "../services/ningi.service";
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

}
