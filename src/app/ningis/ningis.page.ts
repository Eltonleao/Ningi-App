import { Component, OnInit } from '@angular/core';
import { Todo, TodoService } from "../services/todo.service";
import { Ningi, NingiService } from "../services/ningi.service";


import { AlertController } from "@ionic/angular";
import { LoadingController } from "@ionic/angular";
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-ningis',
  templateUrl: './ningis.page.html',
  styleUrls: ['./ningis.page.scss'],
})
export class NingisPage implements OnInit {
  ningis: Ningi[];

  constructor(
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public ningiService: NingiService,
    // private loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.ningiService.getNingis().subscribe(res => {
      this.ningis = res;
      console.log(this.ningis);
      this.ningis.map(x =>{
        // x.data_criacao = new Date(x.data_criacao);
        var date = new Date(x.data_criacao);
        var dc = {
          mes: date.getMonth() + 1 < 10 ? "0" + stringify(date.getMonth() + 1) : date.getMonth(),
          dia: date.getDate() < 10 ? "0" + stringify( date.getDate()) : date.getDate(),
          hora: date.getHours() < 10 ? "0" + stringify( date.getHours()) : date.getHours(),
          min: date.getMinutes() < 10 ? "0" + stringify( date.getMinutes()) : date.getMinutes(),
          seg: date.getSeconds() < 10 ? "0" + stringify( date.getSeconds()) : date.getSeconds(),
        };

        x.data_criacao = dc.dia + '/' + dc.mes + ' - ' + dc.hora + ':' + dc.min;
        
      })
    })
  }

  remove(ningi){
    this.ningiService.remove(ningi);
  }

}
